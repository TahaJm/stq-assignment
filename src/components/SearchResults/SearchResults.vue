<script setup lang="ts">
import type { SearchResultsProps } from './SearchResults.types'

const props = defineProps<SearchResultsProps>()
const emit = defineEmits(['select'])

const select = (result: any) => {
  emit('select', result)
}
</script>

<template>
  <div class="results-container" :class="{ visible: true }">
    <div v-if="props.query.length >= 3">
      <ul>
        <li v-if="props.results.length === 0">No results found</li>
        <li
          v-else
          v-for="result in props.results"
          :key="props.getResultKey(result)"
          @mousedown="select(result)"
        >
          <slot :result="result"></slot>
        </li>
      </ul>
    </div>
    <p v-else-if="props.query.length > 0">Type at least 3 characters</p>
  </div>
</template>

<style scoped>
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
