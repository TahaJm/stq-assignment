import type { Book } from '@/types'

type Results = Book | string
export interface SearchProps {
  query: string
  results: any
  getResultKey: (result: Results) => string
  label: string
  placeholder: string
  onChange: (query: string) => void
  value: string
}
