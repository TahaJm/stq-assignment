<script lang="ts">
import { defineComponent } from 'vue'
import BookSearch from '@/components/BookSearch/BookSearch.vue'
import CitiesSearch from '@/components/CitiesSearch/CitiesSearch.vue'

export default defineComponent({
  name: 'App',
  components: {
    CitiesSearch,
    BookSearch
  }
})
</script>

<template>
  <header>
    <h1>City and Book Search</h1>
  </header>
  <main>
    <BookSearch />
    <CitiesSearch />
  </main>
</template>

