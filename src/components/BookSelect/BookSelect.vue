<script setup lang="ts">
import { useBookStore } from '@/stores/bookStore'
import Autocomplete from '@/components/AutoComplete/AutoComplete.vue'
import type { Book } from '@/types'
import { en } from '@/constants/translations'

const bookStore = useBookStore()

const getBookResultKey = (result: Book) => result.title
</script>

<template>
  <Autocomplete
    :label="en.bookInputLabel"
    :placeholder="en.cityInputPlaceholder"
    :fetchResults="bookStore.filterBooks"
    :results="bookStore.bookResults"
    :getResultKey="getBookResultKey"
  >
    <template #default="{ result }">
      <strong>{{ result.title }}</strong> by {{ result.author }}
    </template>
    <template #selected="{ result }">
      <div>
        Selected Book: <strong>{{ result.title }}</strong> by {{ result.author }}
      </div>
    </template>
  </Autocomplete>
</template>
