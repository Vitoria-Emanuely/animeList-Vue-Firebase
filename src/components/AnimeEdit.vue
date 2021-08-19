<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="850">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="purple darken-2" dark v-bind="attrs" v-on="on">Editar</v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5 purple lighten-1 white--text">Editar anime</v-card-title>
        <v-card-text>
          <v-form ref="form" class="pt-7"> 
            <v-row justify="center"><v-col cols="8"><v-text-field label="Novo Anime" v-model="currentNome" :rules="inputRules" required></v-text-field></v-col></v-row>
            <v-row justify="center">
              <v-col cols="4"><v-text-field label="Episódios Assistidos" v-model="currentEp" :rules="inputRules" type="number" @input="addStatusEdit" required></v-text-field></v-col>
              <v-icon>/</v-icon>
              <v-col cols="4"><v-text-field label="Episódios Totais" v-model="currentEpT" :rules="inputRules" type="number" @input="addStatusEdit" required></v-text-field></v-col>
            </v-row>
            <v-row justify="center"><v-col cols="6"><v-select class="select" label="Status" v-model="currentStatus" :rules="inputRules" :items="statusT" required></v-select></v-col></v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="purple darken-2" text @click="editAnime(id)">Salvar</v-btn>
          <v-btn color="primary" text @click="dialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as fb from '@/plugins/firebase'
  export default {
    props: { id: String, nome: String, ep: String, epT: String, status: String } ,
    data() {
    return {
      dialog: false,  
      statusT: [
        "Quero assistir",
        "Completo",
        "Assistindo",
        "Desisti",
      ],
      currentNome: this.nome,
      currentEp: this.ep,
      currentEpT: this.epT,
      currentStatus: this.status,
      inputRules: [
        v => !!v || 'Campo obrigatório',
      ],
    }
  },
  methods: {
    async editAnime(id){
      if (this.$refs.form.validate()){
        if (parseInt(this.currentEp) > parseInt(this.currentEpT)) {
          alert("Digite um número de episódios assistidos válido!")
          return
        } 
        await fb.animesCollection.doc(id).update({
          nome: this.currentNome,
          ep: this.currentEp,
          epT: this.currentEpT,
          status: this.currentStatus,
        })
      } else {
        alert("Não foi possível salvar")
      }
      this.$root.$refs.AnimeView.fetchAnimes()
    },
    addStatusEdit() {
      if (this.currentEp > 0) {
        this.currentStatus = "Assistindo"
      }
      if (this.currentEp == this.currentEpT){
        this.currentStatus = "Completo"
      }
    },
  }
}
</script>