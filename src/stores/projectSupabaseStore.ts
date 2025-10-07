import { defineStore } from 'pinia'
import { supabase } from '../supabase/supabaseClient'


export const useProjectSupabase = defineStore('project', {
	state: () => ({
		projects: [] as any[],
		loading: false,
		error: null as string | null
	}),
	actions: {
		async fetchProjects() {
			this.loading = true
      		this.error = null
      		try{
      			const { data, error } = await supabase.from('projects').select()
		        if (error) throw error
		        this.projects = data ?? []
      		}catch(err: any){
      			this.error = err.message || String(err)
      		}finally {
		        this.loading = false
		    }
		},
		//insert new data
		async saveProject({judul_project, desc, image, tags}: {judul_project: string; desc: string; image?: File; tags: object}) {
			this.loading = true
      		this.error = null

      		try{
      			// 🔹 Dapatkan user yang sedang login
		        const { data: { user } } = await supabase.auth.getUser()
		        if (!user) throw new Error('User belum login')
		        	
      			let thumbnailUrl: string | null = null
      			// ✅ Jika ada file thumbnail, upload ke Supabase Storage
      			
      			if (image) {
      				const fileExt = image.name.split('.').pop()
					const fileName = `${Date.now()}.${fileExt}`
					const filePath = `thumbnails/${fileName}`

					const { error: uploadError } = await supabase.storage
						.from('portfolio-v1') // <-- bucket name kamu
						.upload(filePath, image)

					if (uploadError) throw uploadError

					// Dapatkan public URL dari file yang diupload
					const { data: publicUrlData } = supabase.storage
						.from('portfolio-v1')
						.getPublicUrl(filePath)

					thumbnailUrl = publicUrlData.publicUrl
      			}

      			// ✅ Insert ke tabel projects
      			const { data, error } = await supabase
					.from('projects')
					.insert([
						{
							judul_project,
							desc,
							image: thumbnailUrl, // kolom di tabel Supabase
							tags: tags,
							created_at: new Date().toISOString()
						}
					])
					.select()
					.single()

				if (error) throw error

				// Tambahkan project baru ke state lokal
				this.projects.unshift(data)
				return data
      		}catch (err: any) {
      			this.error = err.message || String(err)
				throw err
      		}finally{
      			this.loading = false
      		}
		}
	}
});