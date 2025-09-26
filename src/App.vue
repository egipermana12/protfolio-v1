<script setup lang="ts">
  import {useMouseAura} from '@func/useMouseAura';
  const {aura} = useMouseAura();

  import Home from '@pages/Home.vue'

</script>

<template>
  <div class="mouse-aura" id="mouse-aura" ref="aura"></div>
  <RouterView />
</template>

<style scoped>
</style>
