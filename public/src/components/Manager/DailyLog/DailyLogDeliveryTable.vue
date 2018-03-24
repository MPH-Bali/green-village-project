<template>
  <v-data-table
    :loading="$firestore.collectionsPending.delivery"
    :headers="headers"
    :items="$firestore.delivery"
    hide-actions class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ $moment(props.item.timestamp).format('hh:mm A') }}</td>
      <td class="text-xs-center">{{ parseInt(props.item.organic) + parseInt(props.item.anorganic) }}</td>
      <td class="text-xs-center">{{ props.item.organic }}</td>
      <td class="text-xs-center">{{ props.item.anorganic }}</td>
      <td class="text-xs-center">{{ props.item.households }}</td>
      <td>{{ props.item.driver }}</td>
      <td>{{ props.item.banjar }}</td>
      <td>{{ props.item.comments }}</td>
      <td class="text-xs-center">
        <v-btn icon @click="$router.push({ name: 'Delivery Form', params: { id: props.item.id }})">
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
        { text: 'Total Delivery (kg)', align: 'center', sortable: true, value: 'total' },
        { text: 'Organic', align: 'center', sortable: true, value: 'organic' },
        { text: 'Anorganic', align: 'center', sortable: true, value: 'anorganic' },
        { text: 'Housholds', align: 'center', sortable: true, value: 'households' },
        { text: 'Driver', align: 'left', sortable: true, value: 'driver' },
        { text: 'Banjar', align: 'left', sortable: true, value: 'banjar' },
        { text: 'Comments', align: 'left', sortable: false, value: 'comments' },
        { text: 'Actions', align: 'center', sortable: false, value: null }
      ]
    }
  }
}
</script>

<style>
  thead {
    background: #e5ece9;
  }
</style>
