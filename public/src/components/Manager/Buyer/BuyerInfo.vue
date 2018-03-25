<template>
 <v-layout row >
   <v-flex xs12 md8 offset-md2>
    
    <v-card class="mt-4">

      <v-toolbar color="white" flat>
        <v-btn icon light @click="$router.push({ name: 'buyers' })">
          <v-icon color="grey darken-2">arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title class="grey--text text--darken-4">{{ data.name }}</v-toolbar-title>
        <v-progress-circular 
          indeterminate 
          :size="30" 
          v-show="getPending"
          color="primary"/> 
        <v-spacer></v-spacer>
        <v-btn icon light @click="$router.push({ name: 'buyer-edit', params: { id: data.id }})">
          <v-icon color="grey darken-2">edit</v-icon>
        </v-btn>
      </v-toolbar>

     <v-container fluid grid-list-lg>
        <transition name="slide">
         <v-layout row wrap v-if="!getPending"  class="buyer-info-container">
           <v-flex xs6 sm3>
             <p class="body-2 mb-1">Buyer name</p>
             <p> {{ data.name || '-' }}</p>
           </v-flex>
           <v-flex xs6 sm3>
             <p class="body-2 mb-1">Company</p>
             <p>{{ data.company || '-' }}</p>
           </v-flex>
           
           <v-flex xs6 sm3>
             <p class="body-2 mb-1">E-mail</p>
             <p>{{ data.email || '-' }}</p>
           </v-flex>
           <v-flex xs6 sm3>
             
           </v-flex>

           <v-flex xs6 sm3>
             <p class="body-2 mb-1">Phone</p>
             <p>{{ data.phone || '-' }}</p>
           </v-flex>
           <v-flex xs6 sm3>
             <p class="body-2 mb-1">Whatsapp</p>
             <p>{{ data.whatsapp || '-' }}</p>
           </v-flex>
           <v-flex xs6 sm3></v-flex>

           <v-flex xs12 sm9>
             <p class="body-2 mb-1">Notes</p>
             <p>{{ data.notes || '-' }}</p>   
           </v-flex>
           <v-flex xs3>
            <v-btn color="primary">
              Send Email
            </v-btn>
           </v-flex>

         </v-layout>        
        </transition>
      </v-container>
    </v-card>
    
    <v-card class="mt-4">
      <v-container fluid grid-list-lg>
        <v-flex xs12>
          <p class="title">Sales history</p>
        </v-flex>
      </v-container>  
    </v-card>

   </v-flex>
 </v-layout>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      reqired: true
    }
  },
  data () {
    return {
      getPending: false,
      data: {}
    }
  },
  created () {
    this.fetchBuyer(this.id)
  },
  methods: {
    async fetchBuyer (id) {
      this.getPending = true
      const result = await this.$firestore.get('person', id)
      this.getPending = false
      this.data = result
    }
  }
}
</script>

<style>
  .buyer-info-container {
    overflow: hidden;
  }
  .slide-enter-active, .slide-leave-active {
    max-height: 1000px;
    transition: max-height .5s, opacity .5s;
  }
  .slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    max-height: 0;
  }
</style>
