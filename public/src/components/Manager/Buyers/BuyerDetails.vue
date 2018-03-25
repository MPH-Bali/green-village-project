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
           <v-flex xs3 text-xs-right>
              <a :href="'mailto:' + data.email" v-if="data.email">
                <v-btn color="primary">
                  Send Email
                </v-btn>
              </a>
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
        <v-data-table
          :loading="$firestore.collectionsPending.sales"
          :headers="headers"
          :items="buyersSales"
          :light="true"
          no-data-text="No Sales"
          hide-actions class="buyers-table"
          pagination.sync="pagination">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.date || $moment().format('DD/MM/YYYY') }}</td>
            <td class="text-xs-center">{{ props.item.materials[0].material.name }}</td>
            <td class="text-xs-center">{{  props.item.materials[0].kilo }}kg</td>
            <td class="text-xs-center">{{ props.item.materials[0].pricePerKilo }}IDR/kg</td>
            <td class="text-xs-center">{{ props.item.materials[0].finalPrice || computeFinalPrice(props.item) }}IDR</td>
            <td class="text-xs-center">
                <v-btn icon @click="">
                  <v-icon size="16px" color="primary">edit</v-icon>
                </v-btn>
                <v-btn icon @click="">
                  <v-icon size="16px" color="primary">close</v-icon>
                </v-btn>                
            </td>
          </template>
        </v-data-table>
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
      data: {},
      headers: [
        { text: 'Date', align: 'center', sortable: true, value: 'name' },
        { text: 'Material/Compost', align: 'center', sortable: true, value: 'company' },
        { text: 'Kg', align: 'center', sortable: true, value: 'sales.length' },
        { text: 'Cost/Kg', align: 'center', sortable: true, value: 'lastPurchase' },
        { text: 'Final Price', sortable: true, align: 'center', value: 'finalPrice' },
        { text: '', sortable: false, align: 'center', value: null }
      ]
    }
  },
  computed: {
    allSales () {
      return this.$firestore.list.sales
    },
    buyersSales () {
      return this.allSales.filter(sale => sale.buyer.id === this.data.id)
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
    },
    computeFinalPrice (item) {
      return item.materials[0].kilo * item.materials[0].pricePerKilo
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
