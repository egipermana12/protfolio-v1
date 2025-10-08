import { defineStore } from 'pinia'
import { supabase } from '../supabase/supabaseClient'

export const usePublicStore = defineStore('projectSelected', {
	state: () => ({
		projects: [] as any[],
		project: null,
		loading: false,
		error: null as string | null
	}),
	actions: {
		async fetchPublishProjects() {
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
		async getSingleProject({uuid, slug}: {uuid: string, slug: string}) {
			this.loading = true
      		this.error = null
      		try{
      			const { data, error: err } = await supabase.from('projects').select('*').eq('id', uuid).eq('slug_project', slug).single()
		        
		        if(err && err.code === 'PGRST116'){
		        	router.replace('/NotFound') // ✅ Redirect ke halaman not found
    				return
		        }

		        if (err || !data) {
				    error.value = err?.message || 'Artikel tidak ditemukan'
				    router.replace('/NotFound') // ✅ Backup redirect
				    return
				}

				this.project = data ?? null
  				this.loading = false
      		}catch(err: any){
      			this.error = err.message || String(err)
      		}finally {
		        this.loading = false
		    }
		}
	}
});