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
	}
});