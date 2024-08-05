<script setup lang="ts">
import Autocomplete from '@/components/AutoComplete/AutoComplete.vue'
import { useCityStore } from '@/stores/cityStore'

const cityStore = useCityStore()
const getCityResultKey = (result: string) => result
</script>

<template>
  <Autocomplete
    label="Search Cities"
    placeholder="Search cities..."
    :fetchResults="cityStore.filterCities"
    :results="cityStore.cityResults"
    :getResultKey="getCityResultKey"
  >
    <template #default="{ result }">
      {{ result }}
    </template>
    <template #selected="{ result }">
      <div>Selected City: {{ result }}</div>
    </template>
  </Autocomplete>
</template>
