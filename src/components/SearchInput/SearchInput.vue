<script setup lang="ts">
import { defineEmits } from 'vue'
import { useSearchInput } from './SearchInput.composable'
import type { SearchInputProps } from './SearchInput.types'

const vFocus = {
  mounted(el: HTMLElement) {
    el.focus()
  }
}
const props = defineProps<SearchInputProps>()

const emit = defineEmits(['focus', 'blur'])

const { internalValue, onInput, onFocus, onBlur } = useSearchInput(props, emit)
</script>

<template>
  <div>
    <label>{{ props.label }}</label>
    <input
      type="text"
      v-model="internalValue"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      :placeholder="props.placeholder"
      ref="input"
      class="search-input"
      v-focus
    />
  </div>
</template>

<style scoped>
.search-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
</style>
