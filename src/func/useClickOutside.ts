export default {
	// Dipanggil sebelum element dimasukkan ke DOM.
	mounted(el, binding) {
		// 'el' adalah elemen di mana directive ini ditempelkan 
		 el.__ClickOutsideHandler__ = (event) => {
		 	// 💡 LANGKAH BARU 1: Periksa Elemen Pengecualian (Exclusion)
            // Binding.arg (opsional) atau Binding.value bisa digunakan untuk pengecualian
            let isExcluded = false;

            // Asumsi: Tombol toggle memiliki ID unik atau class khusus, 
            // misalnya: id="sidebar-toggle-button"
            const exclusionElement = document.getElementById('sidebar-toggle-button');

            if (exclusionElement && exclusionElement.contains(event.target)) {
                 isExcluded = true;
            }

		 	// Periksa jika klik BUKAN di elemen itu sendiri DAN BUKAN di dalam elemen tersebut.
            // (Ditambahkan juga pengecualian untuk tombol toggle di navbar, jika ada)
            // PERBAIKAN: Hanya jalankan jika BUKAN pengecualian DAN BUKAN di dalam sidebar
            if (
                !isExcluded && // Bukan tombol pengecualian
                !(el === event.target || el.contains(event.target)) // Bukan sidebar atau di dalamnya
            ) {
                binding.value(event);
            }
		 };
		 // Tambahkan event listener ke seluruh dokumen
        document.addEventListener('click', el.__ClickOutsideHandler__);
	},
	// Dipanggil saat parent component di-unmount (dihilangkan dari DOM)
	 unmounted(el) {
        // Hapus event listener saat komponen dihancurkan untuk mencegah kebocoran memori.
        document.removeEventListener('click', el.__ClickOutsideHandler__);
        delete el.__ClickOutsideHandler__;
    },
}