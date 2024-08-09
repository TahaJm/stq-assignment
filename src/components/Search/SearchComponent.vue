<script setup lang="ts">
import type { SearchProps } from './Search.types'
import { useSearch } from './Search.composable'
import { en } from '@/constants/translations'
import { MINIMUM_SEARCH_CHARACTER } from '@/constants/configs'

const props = defineProps<SearchProps>()
const emit = defineEmits(['focus', 'select', 'debounceQueryChanged'])

const vFocus = {
  mounted: (el: HTMLInputElement) => el.focus()
}
const {
  handleInput,
  handleFocusEvent,
  resultsVisible,
  handleBlurEvent,
  value,
  handleSelectResult
} = useSearch(emit)
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
        :placeholder="props.placeholder"
        class="search-input"
        v-focus
      />
    </div>
    <div class="results-container" :class="{ visible: resultsVisible }">
      <div v-if="value.length >= MINIMUM_SEARCH_CHARACTER">
        <ul>
          <li v-if="props.results.length === 0">{{ en.noResults }}</li>
          <li
            v-else
            v-for="result in props.results"
            :key="props.getResultKey(result)"
            @click="handleSelectResult(result)"
            @keydown.enter="handleSelectResult(result)"
            @keydown.esc="handleBlurEvent"
            tabindex="0"
          >
            <slot :result="result"></slot>
          </li>
        </ul>
      </div>
      <p v-else-if="props.query.length > 0">{{ en.notEnoughCharacter }}</p>
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
