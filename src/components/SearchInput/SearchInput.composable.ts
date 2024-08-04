import { ref, watch } from 'vue'
import { debounce } from '@/utils'
import { DEBOUNCE_DELAY } from '@/constants/configs'
import type { SearchInputProps } from './SearchInput.types'

export function useSearchInput(props: SearchInputProps, emit: any) {
  const internalValue = ref(props.value)

  const debouncedOnChange = debounce((query: string) => {
    props.onChange(query)
  }, DEBOUNCE_DELAY)

  const onInput = () => {
    debouncedOnChange(internalValue.value)
  }

  const onFocus = () => {
    emit('focus')
  }

  const onBlur = () => {
    emit('blur')
  }

  watch(
    () => props.value,
    (newValue) => {
      internalValue.value = newValue
    }
  )

  return { internalValue, onInput, onFocus, onBlur }
}
