import { defineStore } from 'pinia'
import { bookInitialData } from '@/constants/book'
import { MINIMUM_SEARCH_CHARACTER } from '@/constants/configs'

export const useBookStore = defineStore('book', {
  state: () => bookInitialData,
  actions: {
    filterBooks(query: string) {
      if (query.length < MINIMUM_SEARCH_CHARACTER) {
        this.bookResults = []
        return
      }
      this.bookResults = this.books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      )
    }
  }
})
