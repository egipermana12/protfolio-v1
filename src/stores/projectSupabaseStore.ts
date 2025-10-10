import { defineStore } from 'pinia'
import { supabase } from '../supabase/supabaseClient'
import {useAuthStore} from '@stores/useAuthStore'
import {uploadImageSupabase} from '@func/useUploadImageSupabase'
// import route from '../route/route.ts'
 
const auth = useAuthStore()

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
		async saveProject({judul_project, slug_project, desc, thumbnail, tags, status}: {judul_project: string; slug_project?: string; status: string;desc: string; thumbnail?: File; tags: string[]}) {
			this.loading = true
      		this.error = null

      		try{
      			// 🔹 Dapatkan user yang sedang login
		        const { data: { user } } = await supabase.auth.getUser()
		        if (!user) throw new Error('User belum login')
		        	
      			let thumbnailUrl: string | null = null
      			// ✅ Jika ada file thumbnail, upload ke Supabase Storage
      			
      			if (thumbnail) {
					thumbnailUrl = await uploadImageSupabase(thumbnail)
      			}

      			// ✅ Insert ke tabel projects
      			const { data, error } = await supabase
					.from('projects')
					.insert([
						{
							user_id: auth.user.id,
							judul_project: judul_project,
							slug_project: slug_project,
							desc: desc,
							status: status,
							thumbnail: thumbnailUrl, // kolom di tabel Supabase
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
		},
		async fetchSingeProject({uuid, slug}: {uuid: string, slug: string}){
			this.loading = true
      		this.error = null

      		try{
      			const { data, error: err } = await supabase.from('projects').select('*').eq('id', uuid).eq('slug_project', slug).single()
		        
		        if(err && err.code === 'PGRST116'){
		        	throw new Error('Not found')
		        	route.push('/admin')
    				return
		        }

		        if (err || !data) {
				    error.value = err?.message || 'Artikel tidak ditemukan'
				    throw new Error('Not found')
				    route.push('/admin')
				    return
				}

				this.projects = data ?? null
  				this.loading = false
      		}catch(err: any){
      			this.error = err.message || String(err)
      			throw err;
      		}finally {
		        this.loading = false
		    }
		}
	}
});