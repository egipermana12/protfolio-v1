import { defineStore } from 'pinia'
import { supabase } from '../supabase/supabaseClient'

export const useAuthStore = defineStore('auth',{
	state: () => ({
		user: null as any | null,
    	loading: false,
    	error: null as string | null,
    	session: null as any | null,
    	logoutTimer: null as any | null,
	}),
	actions: {
		async initSession(){
			const { data } = await supabase.auth.getSession()
			this.session = data.session
      		this.user = data.session?.user ?? null
      		//tangkap aktivitas user
      		window.addEventListener('mousemove', this.startAutoLogoutTimer)
			window.addEventListener('keydown', this.startAutoLogoutTimer)
		},
		async fetchUser(){
			const { data, error } = await supabase.auth.getUser()
			if (error) {
		        this.user = null
		    } else {
		        this.user = data.user
		    }
		},
		async login(email: string, password: string){
			this.loading = true
      		this.error = null
      		try{
      			const { data, error } = await supabase.auth.signInWithPassword({ email, password })
		        if (error) throw error
		        this.user = data.user
		        return data.user
      		}catch (err: any) {
		        this.error = err.message
		        throw err
		    } finally {
		        this.loading = false
		    }
		},
		async logout() {
      		await supabase.auth.signOut()
      		this.user = null
    	},

    	// ⏱️ Timer auto logout setelah 2 jam
    	startAutoLogoutTimer(){
    		this.clearLogoutTimer()

    		const SESSION_LIMIT = 2 * 60 * 60 * 1000 // 2 jam
    		this.logoutTimer = setTimeout(() => {
    			console.warn('⏰ Session expired, auto logout.')
        		this.logout()
    		}, SESSION_LIMIT)
    	},

    	//clear session
    	clearLogoutTimer(){
    		if(this.logoutTimer){
    			clearTimeout(this.logoutTimer)
        		this.logoutTimer = null
    		}
    	},
	},


})