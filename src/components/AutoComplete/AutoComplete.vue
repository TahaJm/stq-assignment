<script setup lang="ts">
import SearchInput from '@/components/SearchInput/SearchInput.vue'
import SearchResults from '@/components/SearchResults/SearchResults.vue'
import { useAutocomplete } from './AutoComplete.composable'
import type { AutocompleteProps } from './AutoComplete.types'

const props = defineProps<AutocompleteProps>()

const {
  query,
  isFocused,
  selectedResult,
  updateQuery,
  onFocus,
  onBlur,
  handleSelect,
  removeSelection
} = useAutocomplete(props.fetchResults)
</script>

<template>
  <div class="autocomplete-wrapper">
    <SearchInput
      :label="label"
      :placeholder="placeholder"
      :onChange="updateQuery"
      @focus="onFocus"
      @blur="onBlur"
      :value="query"
    />
    <SearchResults
      :query="query"
      :results="results"
      :getResultKey="getResultKey"
      :isVisible="isFocused"
      @select="handleSelect"
    >
      <template #default="{ result }">
        <slot :result="result"></slot>
      </template>
    </SearchResults>
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
