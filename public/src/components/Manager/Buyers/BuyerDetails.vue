<template>
 <v-layout row >
   <v-flex xs12 md8 offset-md2>

    <v-card class="mt-4">

      <v-toolbar color="white" flat>
        <v-btn icon light @click="$router.push({ name: 'buyers' })">
          <v-icon color="grey darken-2">arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title class="grey--text text--darken-4">
          {{ $store.buyerDetails.pending || data.name }}
        </v-toolbar-title>
        <v-progress-circular
          indeterminate
          :size="30"
          v-show="$store.buyerDetails.pending"
          color="primary"/>
        <v-spacer></v-spacer>
        <v-btn icon light @click="$router.push({ name: 'buyerForm', params: { id: data.id }})">
          <v-icon color="grey darken-2">edit</v-icon>
        </v-btn>
      </v-toolbar>

     <v-container fluid grid-list-lg>
        <transition name="slide">
         <v-layout row wrap v-if="!$store.buyerDetails.pending"  class="buyer-info-container">
           <v-flex xs12 sm3>
             <p class="body-2 mb-1">{{ $t('buyers.buyer') }} {{ $t('common.Name') }}</p>
             <p> {{ data.name || '-' }}</p>
           </v-flex>
           <v-flex xs12 sm3>
             <p class="body-2 mb-1">{{ $t('common.Company') }}</p>
             <p>{{ data.company || '-' }}</p>
           </v-flex>

           <v-flex xs12 sm3>
             <p class="body-2 mb-1">{{ $t("common.Email") }}</p>
             <p>{{ data.email || '-' }}</p>
           </v-flex>
           <v-flex xs12 sm3>

           </v-flex>

           <v-flex xs12 sm3>
             <p class="body-2 mb-1">{{ $t('common.PhoneNumber') }}</p>
             <p>{{ data.phone || '-' }}</p>
           </v-flex>
           <v-flex xs12 sm3>
             <p class="body-2 mb-1">{{ $t('common.Whatsapp') }}</p>
             <p>{{ data.whatsapp || '-' }}</p>
           </v-flex>
           <v-flex xs12 sm3></v-flex>

           <v-flex xs12 sm9>
             <p class="body-2 mb-1">{{ $t('common.Notes') }}</p>
             <p>{{ data.notes || '-' }}</p>
           </v-flex>
           <v-flex xs12 text-xs-right>
              <a :href="'mailto:' + data.email" v-if="data.email">
                <v-btn color="primary">
                  {{ $t("common.Send") }} {{ $t("common['Email']") }}
                </v-btn>
              </a>
           </v-flex>

         </v-layout>
        </transition>
      </v-container>
    </v-card>

    <h1 class="px-2 mb-3 mt-4 title">Sales history</h1>
    <v-data-table
      :loading="$store.sales.pending"
      :headers="headers"
      :items="buyersSales"
      :light="true"
      :no-data-text="$t('sales.NoSales')"
      hide-actions class="elevation-1"
      pagination.sync="pagination">
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.date || $moment().format('DD/MM/YYYY') }}</td>
        <td class="text-xs-center">{{ props.item.materials[0].material.name }}</td>
        <td class="text-xs-center">{{ props.item.materials[0].kilo }}kg</td>
        <td class="text-xs-center">{{ props.item.materials[0].pricePerKilo }}IDR/kg</td>
        <td class="text-xs-center">{{ props.item.materials[0].finalPrice || computeFinalPrice(props.item) }}IDR</td>
        <td class="text-xs-center">
            <v-btn icon>
              <v-icon size="16px" color="primary">edit</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon size="16px" color="primary">close</v-icon>
            </v-btn>
        </td>
      </template>
    </v-data-table>
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
  created () {
    this.$sync({
      buyerDetails: this.$db.collection('person').doc(this.id)
    })
  },
  beforeDestroy () {
    this.$store.buyerDetails.unsubscribe()
  },
  computed: {
    data () {
      return this.$store.buyerDetails.data
    },
    allSales () {
      return this.$store.sales.data
    },
    buyersSales () {
      return this.allSales.filter(sale => sale.buyer.id === this.data.id)
    }
  },
  data () {
    return {
      headers: [
        { text: this.$t('common.Date'), align: 'center', sortable: true, value: 'date' },
        { text: this.$t('buyers.materialCompost'), align: 'center', sortable: true, value: 'company' },
        { text: this.$t('buyers.kg'), align: 'center', sortable: true, value: 'sales.length' },
        { text: this.$t('buyers.costKg'), align: 'center', sortable: true, value: 'lastPurchase' },
        { text: this.$t('buyers.FinalPrice'), sortable: true, align: 'center', value: 'finalPrice' },
        { text: '', sortable: false, align: 'center', value: null }
      ]
    }
  },
  methods: {
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
