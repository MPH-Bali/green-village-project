<template>
  <v-data-table
    :loading="$firestore.collectionsPending.delivery"
    :headers="headers"
    :items="$firestore.dailyCollections.delivery"
    hide-actions class="elevation-1">
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ $moment(props.item.timestamp).format('hh:mm A') }}</td>
      <td class="text-xs-center">{{ props.item.villas }}</td>
      <td class="text-xs-center">{{ props.item.households }}</td>
      <td class="text-xs-center">{{ props.item.businesses }}</td>
      <td class="text-xs-center">{{ props.item.facilities }}</td>
      <td>{{ props.item.driver && props.item.driver.name }}</td>
      <td>{{ props.item.banjar && props.item.banjar.name }}</td>
      <td class="text-xs-center">
        <v-btn icon @click="$router.push({ name: 'deliveryForm', params: { id: props.item.id }})">
          <v-icon size="17px" color="primary">fa-edit</v-icon>
        </v-btn>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      headers: [
        { text: 'Time', align: 'center', sortable: true, value: 'timestamp' },
        { text: 'Villas', align: 'center', sortable: true, value: 'villas' },
        { text: 'Households', align: 'center', sortable: true, value: 'households' },
        { text: 'Businesses', align: 'center', sortable: true, value: 'businesses' },
        { text: 'Facilities', align: 'center', sortable: true, value: 'facilities' },
        { text: 'Driver', align: 'left', sortable: true, value: 'driver' },
        { text: 'Banjar', align: 'left', sortable: true, value: 'banjar' },
        { text: 'Actions', align: 'center', sortable: false, value: null }
      ]
    }
  }
}
</script>
