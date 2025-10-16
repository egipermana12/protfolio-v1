import { defineStore } from 'pinia'
import { ref } from 'vue'
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
		error: null as string | null,
		currentPage: 1,
		itemsPerPage: 10, // Default 10 data per halaman
		totalItemsCount: 0,
		showPagination: false, //untuk paginasi tombol
		shouldFetchCount: false //State baru: Kontrol apakah count harus diambil
	}),
	actions: {
		async fetchProjects(searchTerm: string = '', fetchCount: boolean = false) {
			this.loading = true
      		this.error = null

      		// Terapkan nilai fetchCount ke state
        	this.shouldFetchCount = fetchCount;

      		// Reset halaman ke 1 jika user melakukan pencarian baru
			if (searchTerm && this.currentPage !== 1) {
				this.currentPage = 1
			}
      		
      		const from = (this.currentPage - 1) * this.itemsPerPage;
            const to = from + this.itemsPerPage - 1;

      		try{
      			// 💡 Logika kunci: Hanya sertakan { count: 'exact' } jika this.shouldFetchCount adalah true
      			const selectOptions = this.shouldFetchCount ? { count: 'exact' } : {};

      			let query = supabase.from('projects').select('*', selectOptions).order('created_at', { ascending: false })
      			
      			// 🚀 Logika Pencarian Dinamis
      			if(searchTerm){
		            query = query.ilike('judul_project', `%${searchTerm}%`); 
      			}

      			query = query.range(from, to)
      			const { data, error, count } = await query

		        if (error) throw error
		        this.projects = data ?? []
		    	if (this.shouldFetchCount) {
		    		this.totalItemsCount = count ?? 0
		    	}
		    	// 💡 Atur showPagination: true saat count diambil
            	this.showPagination = this.shouldFetchCount;

      		}catch(err: any){
      			this.error = err.message || String(err)
      		}finally {
		        this.loading = false
		    }
		}, 
		// 💡 Action baru untuk mengaktifkan paginasi (dipanggil oleh tombol "Tampilkan Paginasi")
		async enablePaginationAndFetchCount(searchTerm: string = ''){
			// Aktifkan pengambilan count dan ambil data
	        await this.fetchProjects(searchTerm, true); 
	        this.showPagination = true; // Konfirmasi bahwa paginasi diaktifka
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
      	},
      	//paginasi
      	setCurrentPage(page: number) {
            this.currentPage = page;
        },
      
	},
	//end action
	getters: {
		totalPages(): number{
			return this.itemsPerPage > 0
			    ? Math.ceil(this.totalItemsCount / this.itemsPerPage)
			    : 0;
		}
	}
});