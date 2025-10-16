<script setup lang="ts">
    import { onMounted, ref, watch, computed } from 'vue' 
    import { storeToRefs } from 'pinia'

    import {getExcerpt} from '@func/UseKumpulanFunc'

    import Button from '@utils/Button.vue'
    import Paginasi from '@components/Paginasi.vue'
    import {useProjectSupabase} from '@stores/projectSupabaseStore'   
    const supabaseProject = useProjectSupabase()

    const searchTerm = ref('') 
    let searchTimeout: ReturnType<typeof setTimeout> | null = null; // Untuk Debouncing
   

    onMounted(() => {
        supabaseProject.fetchProjects(searchTerm.value, false)
    })

    // 🚀 Fungsi baru untuk me-refresh/menampilkan ulang data
    const handleRefresh = async () => {
        supabaseProject.showPagination = false;
        // Panggil action yang sudah ada untuk mengambil data dari Supabase
        await supabaseProject.fetchProjects(searchTerm.value, false) 
        supabaseProject.currentPage = 1; 
    }

    // 🚀 Fungsi untuk MENGAKTIFKAN Paginasi
    const enablePagination = async () => {
        await supabaseProject.enablePaginationAndFetchCount(searchTerm.value);
        // Setelah ini, totalItemsCount akan terisi, dan showPagination akan jadi true.
    }

    // 🚀 Watcher: Panggil fetchProjects setiap kali searchTerm berubah
    watch(searchTerm, (newTerm) => {
        if (searchTimeout) clearTimeout(searchTimeout);

        // Debouncing opsional: (Untuk mencegah terlalu banyak request saat mengetik)
        // Jika Anda ingin menunda pencarian 500ms setelah user berhenti mengetik, gunakan setTimeout.
        
        searchTimeout = setTimeout(() => {
            supabaseProject.showPagination = false;
            // Reset ke halaman 1 saat pencarian baru dimulai
            supabaseProject.currentPage = 1; 
            supabaseProject.fetchProjects(newTerm, false);
        }, 300); // Debounce 300ms
    }, { 
        // immediate: true // Hapus immediate karena kita sudah memanggilnya di onMounted
    })

    const handleDeletData = async(uuid: string) => {
        if (!confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
            return;
        }

        try{
            const deleteData = await supabaseProject.deleteData({uuid: uuid})
            alert('Data sukses dihapus')

            //reload data
            // supabaseProject.fetchProjects()
        }catch (error) {
            console.error('Error saat penghapusan:', error);
            alert('Gagal menghapus proyek: ' + supabaseProject.error);
        }
    }

    const { totalItemsCount, totalPages, currentPage, loading } = storeToRefs(supabaseProject)

    const handlePageChange = (newPage: number) => {
        supabaseProject.setCurrentPage(newPage)
        supabaseProject.fetchProjects(searchTerm.value, true);
    }


</script>

<template>
    <div class="">
        <div class="">
            <h4>Project</h4>
            <p class="desc">Manage and view all your, including order status, payment details, and fulfillment information.</p>
        </div>
        <div class="button_fungsi">
            <div class=""></div>
            <div>
                <Button 
                    textBtn="Refresh / Tampilkan" 
                    @click="handleRefresh" 
                    :disabled="supabaseProject.loading" 
                />
                <RouterLink to="/admin/project/new">
                    <Button textBtn="Baru" />
                </RouterLink>
            </div>
        </div>
        <div class="">
            <div class="search_wrapper">
                <input 
                    type="text" 
                    v-model="searchTerm" 
                    placeholder="Cari Judul Proyek..."
                    class="input_search"
                />
            </div>
        </div>
        <table id="content" class="table_projects">
                <thead class="table_projects_thead">
                    <tr>
                        <th class="table_projects_th" width="70%">Project</th>
                        <th class="table_projects_th">Build with</th>
                        <th class="table_projects_th">Action</th>
                    </tr>
                </thead>
                <!-- loading -->
                <tbody v-if="supabaseProject.loading">
                  <tr><td colspan="2" class="text-center">Loading...</td></tr>
                </tbody>

                <!-- error -->
                <tbody v-else-if="supabaseProject.error">
                  <tr><td colspan="2" class="text-center text-red-500">{{ supabaseProject.error }}</td></tr>
                </tbody>

                <!-- data -->
                <tbody v-else>
                    <tr class="table_projects_trbody" v-for="project in supabaseProject.projects" :key="project.id">
                        <td class="table_projects_tdbody td_image">
                            <img v-if="project.thumbnail != null" :src="project.thumbnail" alt="image" class="card_image">
                            <div class="judul_td">
                                <span class="td_higlight">{{project.judul_project}}</span>
                                <span class="td_desc">{{getExcerpt(project.desc, 205)}}</span>
                            </div>
                        </td>
                        <td class="table_projects_tdbody">
                            <div class="card_tag">
                                <li class="tag_li" v-for="tag in project.tags">
                                    <div class="tag_text">{{tag}}</div>
                                </li>
                            </div>
                        </td>
                        <td class="table_projects_tdbody">
                            <RouterLink :to="`edit/${project.id}/${project.slug_project}`">
                                Edit
                            </RouterLink>
                            <button @click="handleDeletData(project.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
        </table>
        <!-- paginasi -->
        
        <div class="" v-if="supabaseProject.showPagination && totalPages > 1">
            <Paginasi  
                :total-item-count="totalItemsCount"
                :total-pages="totalPages"
                :current-page="currentPage"
                :loading-status="loading"
                @update:currentPage="handlePageChange"
            />
        </div>
        <div class="" v-else>
            <button @click="enablePagination" :disabled="supabaseProject.loading">tampil halaman</button>
        </div>
        
    </div>
</template>

<style scoped>
    p{
        margin: 0;
        padding: 0;
    }

    .project_wrapper{
        margin-top: 2rem;
    }

    .desc{
        max-width: 32rem;
        font-size: .9rem;
        color: var(--dark-600);
        font-weight: 400;
    }

    .table_projects{
        margin-top: 3rem;
        width: 100%;
        border-collapse: collapse;
        text-align: left;
    }

    .table_projects_thead{
        position: sticky;
        top: 0;
        z-index: 10;
        border-bottom: 1px solid;
        border-color: var(--dark-300);
    }

    .table_projects_th{
        padding-top: 1rem;
        padding-bottom: 1rem;
        padding-right: 2rem;
        font-size: .875rem;
        line-height: 1.25rem;
        font-weight: 600;
    }

    .table_projects_trbody{
        border-bottom: 1px solid;
        border-color: var(--dark-200);
    }

    .td_image{
        display: flex;
        align-items: start;
        gap: 0.7rem;
    }

    .judul_td{
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: .5rem;
    }

    .td_desc{
        font-size: .8rem;
        color: var(--dark-600);
    }

    .table_projects_tdbody{
        padding-top: 1rem;
        padding-bottom: 1rem;
        padding-right: 1rem;
        vertical-align: top;
        font-size: .875rem;
        line-height: 1.25rem;
    }

    .td_higlight{
        font-size: .9rem;
        font-weight: 600;
        line-height: 1.375;
    }

    .card_tag {
        display: flex;
        flex-wrap: wrap;
        margin-top: .5rem;
    }

    .tag_li {
        margin-right: .375rem;
        margin-top: .5rem;
    }

    .tag_text {
        display: flex;
        align-items: center;
        border-radius: 9999px;
        padding-left: .75rem;
        padding-right: .75rem;
        padding-top: .25rem;
        padding-bottom: .25rem;
        font-size: .75rem;
        line-height: 1rem;
        font-weight: 600;
        line-height: 1.25rem;
        background-color: rgba(59, 130, 246, .2);
        color: var(--accent);
    }

    .card_image {
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: .25rem;
        border-width: 2px;
        border-color: rgba(226, 232, 240, .1);
        max-width: 150px;
        height: auto;
    }

    .button_fungsi{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>