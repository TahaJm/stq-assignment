import { defineStore } from 'pinia'
import { cityInitialData } from '@/constants/cities'
import { MINIMUM_SEARCH_CHARACTER } from '@/constants/configs'

export const useCityStore = defineStore('city', {
  state: () => cityInitialData,
  actions: {
    filterCities(query: string) {
      if (query.length < MINIMUM_SEARCH_CHARACTER) {
        this.cityResults = []
        return
      }
      this.cityResults = this.cities.filter((city) =>
        city.toLowerCase().includes(query.toLowerCase())
      )
    }
  }
})
