import { supabase } from '../supabase/supabaseClient'

/**
 * Upload image ke Supabase Storage (bucket public)
 * @param {File} file - File gambar yang akan diupload
 * @param {string} bucket - Nama bucket (default: 'portfolio-v1')
 * @param {string} folder - Nama folder di bucket (default: 'thumbnails')
 * @returns {Promise<string>} - Public URL dari file yang diupload
 */

export async function uploadImageSupabase(file: File, bucket = 'portfolio-v1', folder = 'thumbnails'): Promise<string>{
	// ✅ 1. Validasi file
	if (!file) throw new Error('Tidak ada file yang dipilih')

	const validTypes = ['image/jpeg', 'image/png', 'image/webp']
	if (!validTypes.includes(file.type)) {
    	throw new Error('Format gambar tidak valid. Hanya JPG, PNG, atau WEBP yang diperbolehkan.')
  	}

  	const maxSize = 500 * 1024 // 500 KB
  	if (file.size > maxSize) {
    	throw new Error('Ukuran file melebihi 500KB')
  	}

  	// ✅ 2. Buat nama file unik
  	const ext = file.name.split('.').pop()
	const timestamp = Date.now()
	const fileName = `${timestamp}-${Math.random().toString(36).slice(2)}.${ext}`
	const filePath = `${folder}/${fileName}`

	// ✅ 3. Upload ke Supabase Storage
	const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file)

   	if (uploadError) throw uploadError

   	// ✅ 4. Dapatkan public URL
   	const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

	if (!publicUrlData?.publicUrl) {
	    throw new Error('Gagal mendapatkan public URL')
	}

	return publicUrlData.publicUrl
}