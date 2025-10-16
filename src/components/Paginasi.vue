<script setup lang="ts">
	import { ref, computed } from 'vue'
	const props = defineProps({
		totalItemCount: Number,
		totalPages: Number,
		currentPage: Number,
		loadingStatus: Boolean
	})

	// 🚀 1. Definisikan Emit
    // Kita akan mengirim event bernama 'update:currentPage'
    const emit = defineEmits(['update:currentPage'])

	//membuat link halaman
	const pageLinks = computed(() => {
		// Tambahkan pemeriksaan props.totalPages untuk mencegah error jika null/undefined
		const total = props.totalPages || 0
		const current = props.currentPage || 1
		const maxVisible = 3 // 👈 batas maksimal tombol halaman yang ingin ditampilkan

		// Membuat array [1, 2, 3, ...] hingga totalPages jika < maxVis
        if (total <= maxVisible) {
        	return Array.from({ length: total }, (_, i) => i + 1);
    	}	

    	// Tentukan posisi awal dan akhir halaman yang akan ditampilkan
		let start = current - Math.floor(maxVisible / 2)
		let end = current + Math.floor(maxVisible / 2)

  		// Pastikan tidak keluar dari batas
  		if (start < 1) {
		    start = 1
		    end = maxVisible
		  } else if (end > total) {
		    end = total
		    start = total - maxVisible + 1
		  }

		  return Array.from({ length: end - start + 1 }, (_, i) => start + i)

	})

	//membuat fungsi pindah halaman
	const changePage = (page: number) => {
		if(page < 1 || page > props.totalPages) return;

		// 🚀 2. Kirim Event ke komponen induk
        // Komponen induk harus mendengarkan event ini menggunakan @update:currentPage
        emit('update:currentPage', page)
	}
</script>

<template>
	<div class="paginasi_wrapper">
		<span class="total_item">
			Total : {{props.totalItemCount}} data
		</span>
		<div class="paginasi">
			<button 
				@click="changePage(1)"
				:disabled ="props.currentPage === 1 || props.loadingStatus"
				class="btn_pagination"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-left"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg> </button>
			<button 
				@click="changePage(props.currentPage - 1)"
				:disabled ="props.currentPage === 1 || props.loadingStatus"
				class="btn_pagination"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg></button>

			<!-- untuk link paginasi -->
			<button
				v-for="p in pageLinks"
				:key="p"
				@click="changePage(p)"
                :class="['btn_pagination', { 'active_page': p === props.currentPage }]"
				:disabled ="props.loadingStatus"
			>
                {{ p }}
            </button>
			
			<button 
				@click="changePage(props.currentPage + 1)"
				:disabled ="props.currentPage === props.totalPages || props.loadingStatus"
				class="btn_pagination"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
			<button 
				@click="changePage(props.totalPages)"
				:disabled ="props.currentPage === props.totalPages || props.loadingStatus"
				class="btn_pagination"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-right"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg></button>
		</div>
	</div>
</template>

<style scoped>
	.paginasi_wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 1.52rem;
		margin-bottom: 1.2rem;
	}

	.total_item{
		font-size: .85rem;
		color: var(--bg-gray-500);
	}

	.paginasi{
		display: flex;
		gap: 0.3rem;
	}

	.btn_pagination{
		outline: none;
		border: 1px solid var(--dark-300);
		cursor: pointer;
		background: var(--dark-100);
		color: var(--bg);
		padding: .3rem .7rem;
		border-radius: .35rem;
	}

	.btn_pagination:hover{
		background: var(--dark-200);
	}

	.btn_pagination:disabled{
		cursor: not-allowed;
		background: var(--dark-100);
	}

	.btn_pagination.active_page{
		background: var(--accent);
		color: white;
	}

	.btn_pagination > svg {
		
	}
</style>