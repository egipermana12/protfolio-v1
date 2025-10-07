<script setup lang="ts">
	import { ref, watch } from 'vue'
	import { supabase } from '../supabase/supabaseClient'

	const props = defineProps({
  		modelValue: String,
	})

	
	const emit = defineEmits(['update:modelValue'])
	const quillRef = ref(null)
	const localValue = ref(props.modelValue || '')

	// sinkronkan ke parent (v-model)
	watch(localValue, (val) => {
	  emit('update:modelValue', val)
	})
	watch(() => props.modelValue, (val) => {
	  if (val !== localValue.value) localValue.value = val
	})

</script>

<template>
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
	.ql-editor {
  		min-height: 200px;
	}
</style>