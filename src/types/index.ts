export interface Book {
  title: string
  author: string
}

export interface BookStoreState {
  books: Book[]
  bookResults: Book[] | []
}

export interface CityStoreState {
  cities: string[]
  cityResults: string[]
}
