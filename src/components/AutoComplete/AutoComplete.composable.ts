import { ref } from 'vue'

export function useAutocomplete(fetchResults: (query: string) => void) {
  const query = ref('')
  const isFocused = ref(false)
  const selectedResult = ref<any>(null)

  const updateQuery = (newQuery: string) => {
    query.value = newQuery
    fetchResults(newQuery)
  }

  const onFocus = () => {
    isFocused.value = true
  }

  const onBlur = () => {
    if (!selectedResult.value) {
      isFocused.value = false
    }
  }

  const handleSelect = (result: any) => {
    selectedResult.value = result
    query.value = ''
  }

  const removeSelection = () => {
    selectedResult.value = null
  }

  return {
    query,
    isFocused,
    selectedResult,
    updateQuery,
    onFocus,
    onBlur,
    handleSelect,
    removeSelection
  }
}
