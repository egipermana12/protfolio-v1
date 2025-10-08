<script setup lang="ts">
	import { computed } from 'vue'

	interface Option {
		// Nilai yang akan dikirim (misalnya 'admin', 'user')
		value: string | number | boolean
		// Teks yang akan dilihat pengguna (misalnya 'Administrator')
		label: string
	}

	const props = defineProps<{
		  // modelValue adalah standar untuk props v-model
		  modelValue: string | number | boolean
		  // Opsi yang akan di-loop untuk membuat tombol radio
		  options: Option[]
		  // Nama (name) untuk pengelompokan tombol radio (penting untuk aksesibilitas)
		  name: string
		  // Label umum untuk grup radio (misalnya 'Pilih Peran')
		  label?: string
		  // Opsi apakah radio harus dalam satu baris (inline)
		  inline?: boolean
		}>()

	// 2. Definisikan Events yang Dipancarkan
	const emit = defineEmits<{
	  // Event standar untuk v-model
	  (e: 'update:modelValue', value: string | number | boolean): void
	}>()


	// 3. Writable Computed Property untuk v-model
	// Ini menangani dua arah: membaca nilai dari parent dan menulis nilai baru ke parent
	const selectedValue = computed({
	  get() {
	    return props.modelValue
	  },
	  set(newValue) {
	    // Memancarkan event 'update:modelValue' ke parent saat nilai berubah
	    emit('update:modelValue', newValue)
	  }
	})
</script>

<template>
	<fieldset :class="{ 'inline-group': props.inline }">
	    <legend v-if="props.label">{{ props.label }}</legend>

	    <div
	      v-for="option in props.options"
	      :key="option.value.toString()"
	      :class="['radio-wrapper', { 'inline-item': props.inline }]"
	    >
	      <input
	        :id="`${props.name}-${option.value}`"
	        :name="props.name"
	        type="radio"
	        :value="option.value"
	        v-model="selectedValue"
	      />
	      <label :for="`${props.name}-${option.value}`">
	        {{ option.label }}
	      </label>
	    </div>
	</fieldset>
</template>

<style scoped>
	fieldset{
		border: 1px solid var(--dark-300);
	}
	.radio-wrapper {
	  margin-bottom: 8px;
	  display: flex;
	  align-items: center;
	}
	.radio-wrapper label {
	  margin-left: 8px;
	  cursor: pointer;
	}
	.radio-wrapper input[type="radio"] {
	  cursor: pointer;
	}

	/* Styling untuk mode inline (satu baris) */
	.inline-group {
	  display: flex;
	  gap: 20px;
	}
	.inline-item {
	  margin-bottom: 0;
	}
	legend {
	    font-weight: bold;
	    margin-bottom: 10px;
	}
</style>