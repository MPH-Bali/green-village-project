<template>
 <v-layout row >
   <v-flex xs12 md8 offset-md2>
    
    <v-card class="mt-4">
     <v-container fluid grid-list-lg>
       <v-flex xs12 text-xs-center>
         <v-progress-circular 
           indeterminate 
           :size="50" 
           v-show="getPending"
           color="primary"/>          
       </v-flex>
       <v-layout row wrap v-if="!getPending">
         <v-flex xs6>
           <p class="body-2 mb-1">Buyer name</p>
           <p> {{ data.name || '-' }}</p>
         </v-flex>
         <v-flex xs6>
           <p class="body-2 mb-1">Company</p>
           <p>{{ data.company || '-' }}</p>
         </v-flex>
         
         <v-flex xs6>
           <p class="body-2 mb-1">E-mail</p>
           <p>{{ data.email || '-' }}</p>
         </v-flex>
         <v-flex xs6>
         </v-flex>

         <v-flex xs6>
           <p class="body-2 mb-1">Phone</p>
           <p>{{ data.phone || '-' }}</p>
         </v-flex>
         <v-flex xs6>
           <p class="body-2 mb-1">Whatsapp</p>
           <p>{{ data.whatsapp || '-' }}</p>
         </v-flex>

         <v-flex xs12>
           <p class="body-2 mb-1">Notes</p>
           <p>{{ data.notes || '-' }}</p>   
         </v-flex>

       </v-layout>        
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
</style>
