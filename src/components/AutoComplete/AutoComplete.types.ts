export interface AutocompleteProps {
  label: string
  placeholder: string
  fetchResults: (query: string) => void
  results: any[]
  getResultKey: (result: any) => string
}
