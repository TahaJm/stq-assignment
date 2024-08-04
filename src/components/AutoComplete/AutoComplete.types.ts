import type { Book } from '@/types'

export interface AutocompleteProps {
  label: string
  placeholder: string
  fetchResults: (query: string) => void
  results: Book[] | string[]
  getResultKey: (result: any) => string
}
