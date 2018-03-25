<template>
  <v-data-table
    :loading="$firestore.collectionsPending.delivery"
    :headers="headers"
    :items="deliveries"
    hide-actions class="elevation-1">
    <template slot="items" slot-scope="props">
      <tr v-if="!collapsed" class="pointer" @click="props.expanded = !props.expanded">
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
      </tr>
    </template>
    <template slot="expand" slot-scope="props">
      <v-card flat>
        <v-card-text class="pb-0">
          <v-layout row px-2>
            <v-flex xs2>
              <p class="body-2 mb-0">Driver</p>
              <p class="body-1">{{ props.item.driver && props.item.driver.name }}</p>
            </v-flex>
            <v-flex>
              <p class="body-2 mb-0">Comments</p>
              <p class="body-1">{{ props.item.comments || 'No comments' }}</p>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </template>
    <template slot="footer">
      <tr class="secondary pointer" @click="collapsed = !collapsed">
        <td></td>
        <td class="text-xs-center">
          <span class="body-2">
            {{ deliveries.reduce((total, item) => total + parseInt(item.villas), 0) }}
          </span>
        </td>
        <td class="text-xs-center">
          <span class="body-2">
            {{ deliveries.reduce((total, item) => total + parseInt(item.households), 0) }}
          </span>
        </td>
        <td class="text-xs-center">
          <span class="body-2">
            {{ deliveries.reduce((total, item) => total + parseInt(item.businesses), 0) }}
          </span>
        </td>
        <td class="text-xs-center">
          <span class="body-2">
            {{ deliveries.reduce((total, item) => total + parseInt(item.facilities), 0) }}
          </span>
        </td>
        <td colspan="3">
        </td>
      </tr>
    </template>
  </v-data-table>

</template>

<script>
export default {
  computed: {
    deliveries () {
      return this.$firestore.list.delivery
    }
  },
  data () {
    return {
      collapsed: false,
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
