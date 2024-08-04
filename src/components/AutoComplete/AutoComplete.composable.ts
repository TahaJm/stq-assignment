import { ref } from 'vue'

export function useAutocomplete(fetchResults: (query: string) => void) {
  const query = ref('')
  const selectedResult = ref<any>(null)

  const updateQuery = (newQuery: string) => {
    query.value = newQuery
    fetchResults(newQuery)
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
    selectedResult,
    updateQuery,
    handleSelect,
    removeSelection
  }
}
