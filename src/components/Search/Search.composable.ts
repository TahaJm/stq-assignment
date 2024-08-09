import { onMounted, onUnmounted, ref, watch } from 'vue'
import { debounce } from '@/utils'
import { DEBOUNCE_DELAY } from '@/constants/configs'
import type { SearchProps } from './Search.types'

export function useSearch(props: SearchProps, emit: any) {
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

  return { value, handleInput, handleFocusEvent, resultsVisible, handleBlurEvent, handleSelectResult }
}
