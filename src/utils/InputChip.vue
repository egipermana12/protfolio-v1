<script setup lang="ts">
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  set: {
    type: Boolean,
    default: true
  },
  label: String
})

// Emit
const emit = defineEmits(['update:modelValue'])

// State lokal
const chips = ref<string[]>([...props.modelValue])
const currentInput = ref('')

// Watcher agar sinkron dengan parent (termasuk saat form direset)
watch(
  () => props.modelValue,
  (newVal) => {
    // Pastikan array berbeda sebelum diset ulang
    if (JSON.stringify(newVal) !== JSON.stringify(chips.value)) {
      chips.value = [...newVal]
    }
  }
)

// Method untuk menambah chip
const saveChip = () => {
  const input = currentInput.value.trim()
  if (!input) return

  const isDuplicate = props.set && chips.value.includes(input)
  if (!isDuplicate) {
    chips.value.push(input)
  }

  currentInput.value = ''
  emit('update:modelValue', chips.value)
}

// Method untuk hapus chip
const deleteChip = (index: number) => {
  chips.value.splice(index, 1)
  emit('update:modelValue', chips.value)
}

// Hapus chip terakhir pakai backspace
const backspaceDelete = (event: KeyboardEvent) => {
  if (event.key === 'Backspace' && currentInput.value === '' && chips.value.length > 0) {
    chips.value.pop()
    emit('update:modelValue', chips.value)
  }
}
</script>

<template>
  <div class="inputChip_wrapper">
    <label v-if="label" class="label_input">{{ label }}</label>
    <div class="chip-container">
      <div class="chip" v-for="(chip, i) in chips" :key="`${chip}-${i}`">
        {{ chip }}
        <i class="delete-chip" @click="deleteChip(i)">&#10006;</i>
      </div>
      <input
        type="text"
        v-model="currentInput"
        placeholder="Ketik dan tekan Enter..."
        @keyup.enter="saveChip"
        @keydown.delete="backspaceDelete"
      />
    </div>
  </div>
</template>

<style scoped>
.inputChip_wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  margin: 1rem 0;
}

.label_input {
  font-size: 0.85rem;
  color: var(--dark-600);
}

.chip-container {
  border: 0.115rem solid var(--dark-200);
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  min-height: 40px;
  border-radius: 0.3rem;
}

.chip {
  display: inline-flex;
  align-items: center;
  background-color: rgba(59, 130, 246, 0.2);
  color: var(--accent);
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 12px;
}

.delete-chip {
  cursor: pointer;
  margin-left: 5px;
  font-weight: bold;
  font-size: 16px;
  color: #555;
  transition: color 0.2s;
}

.delete-chip:hover {
  color: #000;
}

.chip-container input {
  flex-grow: 1;
  border: none;
  outline: none;
  min-width: 100px;
  padding: 0;
  margin-left: 2px;
  box-sizing: border-box;
}
</style>
