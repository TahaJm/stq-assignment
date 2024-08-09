<script setup lang="ts">
import { useAutocomplete } from './AutoComplete.composable'
import type { AutocompleteProps } from './AutoComplete.types'
import SearchComponent from '@/components/Search/SearchComponent.vue'

const props = defineProps<AutocompleteProps>()

const { query, selectedResult, updateQuery, handleSelect, removeSelection } = useAutocomplete(
  props.fetchResults
)
</script>

<template>
  <div class="autocomplete-wrapper">
    <SearchComponent
      @select="handleSelect"
      @debounceQueryChanged="updateQuery"
      :query="query"
      :results="results"
      :getResultKey="getResultKey"
      :label="label"
      :placeholder="placeholder"
    >
      <template #default="{ result }">
        <slot :result="result"></slot>
      </template>
    </SearchComponent>
    <div class="selected-result">
      <slot v-if="selectedResult" name="selected" :result="selectedResult"></slot>
      <button
        v-if="selectedResult"
        @click="removeSelection"
        :aria-label="`Remove selected item: ${getResultKey(selectedResult)}`"
      >
        X
      </button>
    </div>
  </div>
</template>

<style scoped>
.autocomplete-wrapper {
  position: relative;
  width: 100%;
}
.selected-result {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 32px;
}
</style>
