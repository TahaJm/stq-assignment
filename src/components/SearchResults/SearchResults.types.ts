export interface SearchResultsProps {
  query: string
  results: any[]
  getResultKey: (result: any) => string
  isVisible: boolean
}
