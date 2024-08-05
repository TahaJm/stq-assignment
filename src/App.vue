<script lang="ts">
import { defineComponent } from 'vue'
import CitiesSelect from '@/components/CitiesSelect/CitiesSelect.vue'
import BookSelect from '@/components/BookSelect/BookSelect.vue'

export default defineComponent({
  name: 'App',
  components: {
    BookSelect,
    CitiesSelect
  }
})
</script>

<template>
  <header>
    <h1>City and Book Search</h1>
  </header>
  <main>
    <BookSelect />
    <CitiesSelect />
  </main>
</template>
