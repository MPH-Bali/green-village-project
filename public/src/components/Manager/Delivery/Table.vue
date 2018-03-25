<template>
  <v-data-table
    :loading="$firestore.collectionsPending.delivery"
    :headers="headers"
    :items="deliveries"
    hide-actions class="elevation-1">
    <template slot="items" slot-scope="props">
      <tr v-if="!collapsed" class="pointer" @click.stop="props.expanded = !props.expanded">
        <td class="text-xs-center">{{ $moment(props.item.timestamp).format('hh:mm A') }}</td>
        <td class="text-xs-center">{{ parseInt(props.item.villas) || '-' }}</td>
        <td class="text-xs-center">{{ parseInt(props.item.households) || '-' }}</td>
        <td class="text-xs-center">{{ parseInt(props.item.businesses) || '-' }}</td>
        <td class="text-xs-center">{{ parseInt(props.item.facilities) || '-' }}</td>
        <td class="text-xs-center">
          <v-btn icon @click.stop="props.expanded = !props.expanded">
            <v-icon size="17px" color="primary">remove_red_eye</v-icon>
          </v-btn>
        </td>
        <td class="text-xs-center">
          <v-btn icon @click.stop="$router.push({ name: 'deliveryForm', params: { id: props.item.id }})">
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
              <p class="body-1 mb-3">{{ props.item.driver && props.item.driver.name }}</p>

              <v-btn outline color="primary" class="ml-0 mb-3"
                @click.stop="$router.push('/manager/delivery-form/' +  props.item.id)">
                Edit
              </v-btn>
            </v-flex>
            <v-flex xs2>
              <p class="body-2 mb-0">Banjar</p>
              <p class="body-1">{{ props.item.banjar && props.item.banjar.name }}</p>
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
      <tr class="secondary pointer" @click.stop="collapsed = !collapsed">
        <td></td>
        <td class="text-xs-center">
          <span class="body-2">
            {{ deliveries.reduce((total, item) => total + parseInt(item.villas || 0), 0) }}
          </span>
        </td>
        <td class="text-xs-center">
          <span class="body-2">
            {{ deliveries.reduce((total, item) => total + parseInt(item.households || 0), 0) }}
          </span>
        </td>
        <td class="text-xs-center">
          <span class="body-2">
            {{ deliveries.reduce((total, item) => total + parseInt(item.businesses || 0), 0) }}
          </span>
        </td>
        <td class="text-xs-center">
          <span class="body-2">
            {{ deliveries.reduce((total, item) => total + parseInt(item.facilities || 0), 0) }}
          </span>
        </td>
        <td colspan="2">
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
      collapsed: true,
      headers: [
        { text: 'Time', align: 'center', sortable: true, value: 'timestamp' },
        { text: 'Villas', align: 'center', sortable: true, value: 'villas' },
        { text: 'Households', align: 'center', sortable: true, value: 'households' },
        { text: 'Businesses', align: 'center', sortable: true, value: 'businesses' },
        { text: 'Facilities', align: 'center', sortable: true, value: 'facilities' },
        { text: 'Details', align: 'center', width: '10px', sortable: false, value: null },
        { text: 'Edit', align: 'center', width: '10px', sortable: false, value: null }
      ]
    }
  }
}
</script>
