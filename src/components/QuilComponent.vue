<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String
})

const emit = defineEmits(['update:modelValue'])
const quillRef = ref<any>(null)
const localValue = ref(props.modelValue || '')

// Sinkronisasi ke parent (v-model dua arah)
watch(localValue, (val) => {
  emit('update:modelValue', val)
})

// Sinkronisasi dari parent ke local (untuk reset form)
watch(
  () => props.modelValue,
  async (val) => {
    if (val !== localValue.value) {
      localValue.value = val || ''
      await nextTick() // pastikan Quill sudah ter-render
      if (quillRef.value?.getQuill) {
        const quill = quillRef.value.getQuill()
        quill.root.innerHTML = val || ''
      }
    }
  }
)
</script>

<template>
  <label v-if="label" class="label_input">{{ label }}</label>
  <QuillEditor
    ref="quillRef"
    v-model:content="localValue"
    theme="snow"
    toolbar="full"
    contentType="html"
    class="min-h-[200px]"
  />
</template>

<style scoped>
.label_input {
  font-size: 0.85rem;
  color: var(--dark-600);
}
</style>
