import { onMounted, onUnmounted, ref } from 'vue'
import { debounce } from '@/utils'
import { DEBOUNCE_DELAY } from '@/constants/configs'

export function useSearch(emit: any) {
  const value = ref('')
  const resultsVisible = ref(false)

  const debouncedOnChange = debounce((query: string) => {
    emit('debounceQueryChanged', query)
  }, DEBOUNCE_DELAY)

  const handleInput = () => {
    debouncedOnChange(value.value)
  }

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.search-container')) {
      handleBlurEvent()
    }
  }
  const handleFocusEvent = () => {
    resultsVisible.value = true
  }

  const handleBlurEvent = () => {
    resultsVisible.value = false
  }

  const handleSelectResult = (result: any) => {
    emit('select', result)
    value.value = ''
  }

  onMounted(() => {
    document.addEventListener('click', handleDocumentClick)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleDocumentClick)
  })

  return {
    value,
    handleInput,
    handleFocusEvent,
    resultsVisible,
    handleBlurEvent,
    handleSelectResult
  }
}
