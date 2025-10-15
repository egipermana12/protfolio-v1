import { defineStore } from 'pinia'
import { supabase } from '../supabase/supabaseClient'
import route from '../route/route.ts'


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

      		if (this.session) this.startAutoLogoutTimer()

      		// 🔁 Pantau perubahan session Supabase (login/logout/token refresh)
      		supabase.auth.onAuthStateChange((event, session) =>{
      			if (event === 'SIGNED_IN') {
      				this.session = session
			          this.user = session?.user ?? null
			          this.startAutoLogoutTimer()
			      }else if (event === 'SIGNED_OUT'){
			      	this.clearLogoutTimer()
			          this.session = null
			          this.user = null
			      }
      		})
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
      		this.clearLogoutTimer()
		    this.user = null
		    this.session = null
		    route.push('/login')
    	},

    	// ⏱️ Timer auto logout setelah 2 jam
    	startAutoLogoutTimer(){
    		this.clearLogoutTimer()

    		const SESSION_LIMIT = 2 * 60 * 60 * 1000 
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