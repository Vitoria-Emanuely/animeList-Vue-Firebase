<template>
  <v-container class="pa-8" fluid>
    <h1 class="h1">{{ titulo }}</h1>    
    <anime-form />
    <v-divider class="pt-5"></v-divider>
    <anime-view  />
  </v-container>
</template>

<script>

import AnimeForm from '@/components/AnimeForm.vue'
import AnimeView from '@/components/AnimeView.vue'
export default {
  components: { AnimeForm, AnimeView },
  data() {
    return {
      titulo: "Minha lista de animes",
    }
  },
}
</script>

<style>

</style>