import { defineStore } from 'pinia'
import { supabase } from '../supabase/supabaseClient'
import {useAuthStore} from '@stores/useAuthStore'
import {uploadImageSupabase} from '@func/useUploadImageSupabase'
// import route from '../route/route.ts'
 
const auth = useAuthStore()

export const useProjectSupabase = defineStore('project', {
	state: () => ({
		projects: [] as any[],
		projectDetail: null as any | null,
		loading: false,
		error: null as string | null
	}),
	actions: {
		async fetchProjects(searchTerm: string = '') {
			this.loading = true
      		this.error = null
      		try{
      			let query = supabase.from('projects').select()
      			
      			// 🚀 Logika Pencarian Dinamis
      			if(searchTerm){
      				// Gunakan OR untuk mencari di Judul ATAU Tags (jika tags adalah array/text)
            		// ilike: Case-insensitive LIKE (cocokkan sebagian string)
            		// query = query.or(`judul_project.ilike.%${searchTerm}%,tags.cs.["${searchTerm}"]`);
            		// Jika tags adalah tipe data 'text' atau 'json' biasa, Anda mungkin hanya perlu:
            		// query = query.or(`judul_project.ilike.%${searchTerm}%,tags.ilike.%${searchTerm}%`);
            		
            		// NOTE: Jika tags adalah array JSONB, .cs (contains) harus dicoba dengan input yang tepat.
		            // Untuk penyederhanaan dan keamanan, kita gunakan ilike pada judul.
		            // Jika tags adalah JSONB Array, Supabase mencari array element, bukan string parsial.
		            // Mari kita fokuskan ILIKE pada judul project saja:
		            query = query.ilike('judul_project', `%${searchTerm}%`); 
      			}
      			const { data, error } = await query
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

				this.projectDetail = data ?? null
  				this.loading = false
      		}catch(err: any){
      			this.error = err.message || String(err)
      			throw err;
      		}finally {
		        this.loading = false
		    }
		},
		async deteleThumbnail({url, uuid}: {url: string, uuid: string}){
			this.loading = true
      		this.error = null
      		
      		// 🔹 Dapatkan user yang sedang login
		    const { data: { user } } = await supabase.auth.getUser()
		    if (!user) throw new Error('User belum login')
		    if(!url) return false;

			const urlString = url.value
		    const prefixToFind = '/public/';
		    
		    // Cari indeks dimulainya '/public/'
			const startIndex = urlString.indexOf(prefixToFind);

			let bucketAndPath = '';
			if (startIndex !== -1) {
				    // Ambil string setelah '/public/'
				    bucketAndPath = urlString.substring(startIndex + prefixToFind.length);
			}

			// Pisahkan Nama Bucket dan Jalur File
			const parts = bucketAndPath.split('/');

			const bucketName = parts[0]; // Bagian pertama adalah Nama Bucket
			// Gabungkan kembali sisa bagian untuk mendapatkan Jalur File
			const filePath = parts.slice(1).join('/'); 

      		try{
      			//hapus bucket
				const { data, storageError  } = await supabase.storage.from(bucketName).remove([filePath]);

				if (storageError) throw storageError;

				// 2. Jika penghapusan Storage berhasil, set kolom thumbnail di database menjadi NULL
				const { error: dbError } = await supabase
		          .from('projects') // Ganti dengan nama tabel yang sesuai
		          .update({ thumbnail: null })
		          .eq('id', uuid); // Asumsi uuid adalah kolom ID di database

		        if (dbError) throw dbError;

		        // 3. Update state Pinia lokal setelah berhasil
		        // Ini akan secara otomatis merefleksikan perubahan di semua komponen yang menggunakan state ini
		        if (this.projects.uuid === uuid) {
		          this.projects.thumbnail = null; 
		        }

		        return true;

      		}catch (err: any) {
      			this.error = err.message || String(err)
				throw err
      		}finally{
      			this.loading = false
      		}
		},
		//update data
		async updateProject({judul_project, slug_project, desc, thumbnail, tags, status, uuid}: {judul_project: string; slug_project?: string; status: string;desc: string; thumbnail?: File; tags: string[], uuid: string}) {
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

      			// ✅ update ke tabel projects
      			// 1. Definisikan Payload dasar
				const updatePayload = {
				    user_id: auth.user.id,
				    judul_project: judul_project,
				    slug_project: slug_project,
				    desc: desc,
				    status: status,
				    tags: tags,
				};
				// 2. Tambahkan kolom 'thumbnail' secara kondisional ke Payload
				// Logika: Jika thumbnailUrl BUKAN null (artinya ada file baru yang diupload),
				// maka tambahkan objek { thumbnail: thumbnailUrl } ke payload.
				// Jika thumbnailUrl adalah null, maka tidak ada properti 'thumbnail' yang ditambahkan, 
				// dan Supabase akan mengabaikan kolom tersebut dalam operasi UPDATE.
				const finalPayload = {
				    ...updatePayload,
				    ...(thumbnailUrl !== null && thumbnailUrl !== undefined && thumbnailUrl !== '' ? { thumbnail: thumbnailUrl } : {})
				};

				//exec
				    const { data, error } = await supabase
					.from('projects')
					.update(finalPayload)
					.eq('id', uuid)
					.select()
					.single();

				if (error) throw error

				// 🚀 Perbarui state Pinia
				if (data) {
				    this.projectDetail = data;
				}
				return data
      		}catch (err: any) {
      			this.error = err.message || String(err)
				throw err
      		}finally{
      			this.loading = false
      		}
      	},
      	async deleteData({uuid}: {uuid: string}){
      		this.loading = true
      		this.error = null

      		try{
      			//get file
      			const { data, error: err } = await supabase.from('projects').select('thumbnail').eq('id', uuid).single()
      			const imageData = data.thumbnail
      			if (imageData != null) {
      				const prefixToFind = '/public/';
		    
				    // Cari indeks dimulainya '/public/'
					const startIndex = imageData.indexOf(prefixToFind);

					let bucketAndPath = '';
					if (startIndex !== -1) {
						    // Ambil string setelah '/public/'
						    bucketAndPath = imageData.substring(startIndex + prefixToFind.length);
					}

					// Pisahkan Nama Bucket dan Jalur File
					const parts = bucketAndPath.split('/');

					const bucketName = parts[0]; // Bagian pertama adalah Nama Bucket
					// Gabungkan kembali sisa bagian untuk mendapatkan Jalur File
					const filePath = parts.slice(1).join('/'); 

					//hapus bucket
					const { data, storageError  } = await supabase.storage.from(bucketName).remove([filePath]);

					if (storageError) throw storageError;
      			}

      			const { error } = await supabase
		            .from('projects')
		            .delete()
		            .eq('id', uuid);

		        if (error) throw error;

		        // 🚀 2. Hapus proyek dari array state Pinia secara lokal (Optimal)
        		// Filter array projects, menyisakan semua project yang ID-nya TIDAK sama dengan uuid yang dihapus
        		
        		 this.projects = this.projects.filter(project => project.id != uuid)

      			return true
      		}catch (err: any) {
      			this.error = err.message || String(err)
				throw err
      		}finally{
      			this.loading = false
      		}
      	}
	}
});