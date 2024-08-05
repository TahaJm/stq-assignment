<script setup lang="ts">
import type { SearchProps } from './Search.types'
import { useSearch } from './Search.composable'

const props = defineProps<SearchProps>()
const emit = defineEmits(['focus', 'blur', 'select'])

const { handleInput, handleFocusEvent, handleBlur, resultsVisible, handleBlurEvent, value } =
  useSearch(props, emit)
</script>

<template>
  <div class="search-container">
    <div>
      <label>{{ props.label }}</label>
      <input
        type="text"
        v-model="value"
        @input="handleInput"
        @focus="handleFocusEvent"
        @blur="handleBlur"
        :placeholder="props.placeholder"
        ref="input"
        class="search-input"
      />
    </div>
    <div class="results-container" :class="{ visible: resultsVisible }">
      <div v-if="props.query.length >= 3">
        <ul>
          <li v-if="props.results.length === 0">No results found</li>
          <li
            v-else
            v-for="result in props.results"
            :key="props.getResultKey(result)"
            @click="emit('select', result)"
            @keydown.enter="emit('select', result)"
            @keydown.esc="handleBlurEvent"
            tabindex="0"
          >
            <slot :result="result"></slot>
          </li>
        </ul>
      </div>
      <p v-else-if="props.query.length > 0">Type at least 3 characters</p>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  position: relative;
}

.search-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.results-container {
  position: absolute;
  width: 100%;
  max-height: 300px;
  background: var(--color-background);
  border-radius: var(--spacing-xs);
  box-shadow: var(--shadow-light);
  overflow-y: auto;
  z-index: 1;
  visibility: hidden;
}

.results-container.visible {
  visibility: visible;
}
</style>
