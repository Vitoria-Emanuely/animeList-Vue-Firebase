<template>
<v-list>
      <v-list-item-group>
        <v-list-item v-for="anime of animes" :key="anime.id">
          <v-row class="pb-5 pt-6">
            <v-col cols="3">{{ anime.nome }}</v-col>
            <v-col cols="2" class="text-center">{{ anime.ep }}</v-col>
            <v-icon cols="1">/</v-icon>
            <v-col cols="2" class="text-center">{{ anime.epT }}</v-col>
            <v-col cols="2" class="text-center">{{ anime.status }}</v-col>
            <v-col cols="1"><anime-edit  :id="anime.id" :nome="anime.nome" :ep="anime.ep" :epT="anime.epT" :status="anime.status"/></v-col>
            <v-col cols="1"><v-btn color="red darken-2" dark @click="delAnime(anime.id)">Excluir</v-btn></v-col>
            </v-row>
        </v-list-item>
      </v-list-item-group>
    </v-list>
</template>

<script>
import * as fb from '@/plugins/firebase'
import AnimeEdit from '@/components/AnimeEdit'

export default {
  components: { AnimeEdit },
  data(){
    return {
      animes: [],
    }
  },  
  mounted() {
    this.uid = fb.auth.currentUser.uid
    this.$root.$refs.AnimeView = this
    this.fetchAnimes()
  },
  methods: {
    async fetchAnimes() {
      
      this.animes = []
      const logAnimes = await fb.animesCollection.where('owner', '==', this.uid).get()
      for (const doc of logAnimes.docs) {
        this.animes.push({
          id: doc.id,
          nome: doc.data().nome,
          ep: doc.data().ep,
          epT: doc.data().epT,
          status: doc.data().status,
        })
      }
    }, 
    async delAnime(id) {
      await fb.animesCollection.doc(id).delete()
      this.fetchAnimes()
    },
  },
}
</script>

<style>

</style>