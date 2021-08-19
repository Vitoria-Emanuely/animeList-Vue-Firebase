<template>
  <v-form ref="form">
    <v-row class="pt-4 pb-4">   
      <v-col cols="3"><v-text-field label="Novo Anime" v-model="anime.nome" :rules="inputRules" required></v-text-field></v-col>
      <v-col cols="2"><v-text-field label="Episódios Assistidos" v-model="anime.ep" :rules="inputRules" type="number" @input="addStatus" required></v-text-field></v-col>
      <v-icon>/</v-icon>
      <v-col cols="2"><v-text-field label="Episódios Totais" v-model="anime.epT" :rules="inputRules" type="number" @input="addStatus" required></v-text-field></v-col>
      <v-col cols="2"><v-select class="select" label="Status" v-model="anime.status" :rules="inputRules" :items="statusT" required></v-select></v-col>
      <v-icon slot="append" @click="addAnime">mdi-send</v-icon></v-row>
    </v-form>
</template>

<script>
import * as fb from '@/plugins/firebase'

export default {
  data() {
    return {
      anime: [{
        nome: "",
        ep: "",
        epT: "",
        status: "",
      }],
      statusT: [
        "Quero assistir",
        "Completo",
        "Assistindo",
        "Desisti",
      ],
      inputRules: [
        v => !!v || 'Campo obrigatório',
      ],
    }
  },
  mounted() {
    this.$root.$refs.AnimeForm = this
  },
  methods: {
    async addAnime() {
      if (this.$refs.form.validate()){
        if (parseInt(this.anime.ep) > parseInt(this.anime.epT)) {
          alert("Digite um número de episódios assistidos válido!")
          return
        } 
        if (!await this.compairTitle(this.anime.nome)){
          alert("Esse nome de anime já foi cadastrado!")
          return
        }
        await fb.animesCollection.add({
          nome: this.anime.nome,
          ep: this.anime.ep,
          epT: this.anime.epT,
          status: this.anime.status,
          owner: fb.auth.currentUser.uid,
        })
        this.anime.nome = ""
        this.anime.ep = ""
        this.anime.epT = ""
        this.anime.status = ""
        this.$refs.form.resetValidation()
        this.$root.$refs.AnimeView.fetchAnimes()
      }  
    },
    addStatus() {      
      if (this.anime.ep > 0) {
        this.anime.status = "Assistindo"
      }
      if (this.anime.ep == this.anime.epT){
        this.anime.status = "Completo"
      }
    },    
    async compairTitle(compair){
      const logAnimes = await fb.animesCollection.where("owner", "==", fb.auth.currentUser.uid).get()
      let doc = ""
      for (doc of logAnimes.docs){
        if (doc.data().nome.toLowerCase() == compair.toLowerCase()){
          return false
        }
      }
      return true
    },
  }
}
</script>

<style>

</style>