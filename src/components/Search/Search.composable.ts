import { onMounted, onUnmounted, ref, watch } from 'vue'
import { debounce } from '@/utils'
import { DEBOUNCE_DELAY } from '@/constants/configs'
import type { SearchProps } from './Search.types'

export function useSearch(props: SearchProps, emit: any) {
  const value = ref(props.value)
  const resultsVisible = ref(false)

  const debouncedOnChange = debounce((query: string) => {
    emit('change', query)
  }, DEBOUNCE_DELAY)

  const handleInput = () => {
    debouncedOnChange(value.value)
  }

  const handleBlur = () => {
    emit('blur')
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

  onMounted(() => {
    document.addEventListener('click', handleDocumentClick)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleDocumentClick)
  })
  watch(
    () => props.value,
    (newValue) => {
      value.value = newValue
    }
  )

  return { value, handleInput, handleBlur, handleFocusEvent, resultsVisible, handleBlurEvent }
}
