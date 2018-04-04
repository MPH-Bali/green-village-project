<template>
  <v-layout row >
    <v-flex xs12 md8 offset-md2>
      <v-card class="mt-4">
        <v-card-title>
          <v-text-field
            append-icon="search"
            :label="$t('common.search')"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-flex text-xs-right>
            <v-btn depressed color="primary" @click.stop="$router.push({ name: 'buyerForm' })">
              <v-icon>add_circle</v-icon>
              <span style="text-transform: capitalize" class="ml-2">{{ $t("common.add") }}</span>
            </v-btn>
          </v-flex>
        </v-card-title>

        <v-data-table
          :loading="$store.person.pending"
          :headers="headers"
          :items="buyersList"
          :search="search"
          :light="true"
          :rows-per-page-items="[10, 5, 25,{text: 'All',value: -1}]"
          :no-data-text="$t('common.NoData')"
          :no-results-text="$t('buyers.NoBuyers')"
          class="buyers-table">
          <template slot="items" slot-scope="props">
            <tr @click="$router.push({ name: 'buyerDetails', params: { id: props.item.id }})">
              <td class="text-xs-center">{{ props.item.name }}</td>
              <td class="text-xs-center">{{ props.item.company }}</td>
              <td class="text-xs-center">{{ props.item.sales.length }}</td>
              <td class="text-xs-center">{{ props.item.lastPurchase }}</td>
              <td class="text-xs-center">
                <v-btn icon @click="$router.push({ name: 'buyerDetails', params: { id: props.item.id }})">
                  <v-icon size="17px" color="primary">fa-search</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      headers: [
        { text: this.$t('common.Name'), align: 'center', sortable: true, value: 'name' },
        { text: this.$t('common.Company'), align: 'center', sortable: true, value: 'company' },
        { text: this.$t('buyers.numberOfSales'), align: 'center', sortable: true, value: 'sales.length' },
        { text: this.$t('buyers.lastPurchase'), align: 'center', sortable: true, value: 'lastPurchase' },
        { text: '', sortable: false, align: 'center', value: null }
      ]
    }
  },
  computed: {
    sales () {
      return this.$store.sales.data
    },
    salesByBuyers () {
      return this.sales.reduce((result, sale) => {
        if (!result[sale.buyer.id]) result[sale.buyer.id] = []
        result[sale.buyer.id].push(sale)
        return result
      }, {})
    },
    buyers () {
      return this.$store.person.data.filter(person => {
        return person.type && person.type.buyer
      })
    },
    buyersList () {
      return this.buyers.map(buyer => {
        buyer.sales = this.salesByBuyers[buyer.id] || []
        return buyer
      })
    }
  }
}
</script>
