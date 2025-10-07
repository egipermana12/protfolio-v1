<script setup lang="ts">
	defineProps<{ textBtn: string }>()
</script>

<template>
	<button class="btn_baru">{{textBtn}}</button>
</template>

<style scoped>
	.btn_baru{
        padding-left: 1.8rem;
        padding-right: 1.8rem;
        padding-bottom: .6rem;
        padding-top: .6rem;
        cursor: pointer;
        background: var(--bg);
        border: none;
        color: var(--text);
        font-size: .9rem;
        font-weight: 500;
        border-radius: .3rem;
    }

    .btn_baru:hover{
        background: var(--bg-secondary);
    }
</style>