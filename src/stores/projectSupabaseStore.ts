import { defineStore } from 'pinia'
import { supabase } from '../supabase/supabaseClient'


export const useProjectSupabase = defineStore('project', {
	state: () => ({
		projects: []
	}),
	actions: {
		async fetchProject() {
			const { data } = await supabase.from('projects').select()
			this.projects = data
		},
	}
});