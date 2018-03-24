<template>
  <v-container grid-list-lg>
    <v-layout row mb-3>
      <v-flex text-xs-right
        <v-btn depressed color="primary" @click.stop="$router.push({ name: 'buyer' })">
          <v-icon>add_circle</v-icon>
          <span style="text-transform: capitalize" class="ml-2">Add</span>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-data-table
      :loading="$firestore.collectionsPending.person"
      :headers="headers"
      :items="buyersList"
      hide-actions class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.company }}</td>
        <td class="text-xs-center">{{ props.item.numberOfSales }}</td>
        <td class="text-xs-center">{{ props.item.lastPurchase }}</td>
        <td class="text-xs-center">
          <v-btn icon @click="$router.push({ name: 'buyer', params: { id: props.item.id }})">
            <v-icon size="17px" color="primary">fa-edit</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      buyers: [],
      headers: [
        { text: 'Name', align: 'center', sortable: true, value: 'timestamp' },
        { text: 'Company', align: 'center', sortable: true, value: 'total' },
        { text: 'No. of Sales', align: 'center', sortable: true, value: 'organic' },
        { text: 'Last Purchase', align: 'center', sortable: true, value: 'anorganic' },
        { text: '', align: 'center', sortable: true, value: 'households' }
      ]
    }
  },
  computed: {
    sales() {
      return this.$firestore.collections.sales
    },
    buyersList () {
      return this.$firestore.collections.person.filter(person => {
        return person.type && person.type.buyer
      })
    }
  }
}
</script>
