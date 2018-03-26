<template>
  <v-data-table
    :loading="$firestore.collectionsPending.stock"
    :headers="headers"
    :items="$firestore.collections.stock.filter(x => x.type === 'Compost')"
    hide-actions class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.weight }}</td>
      <td>{{ props.item.type }}</td>
      <td>{{ props.item.comments }}</td>
      <td class="text-xs-center">{{ $moment(props.item.timestamp).format('hh:mm A') }}</td>
      <td class="text-xs-center">
        <v-btn icon @click="$router.push({ name: 'editStockForm', params: { id: props.item.id }})">
          <v-icon size="17px" color="primary">fa-edit</v-icon>
        </v-btn>
      </td>
    </template>
    <template slot="footer">
      <td colspan="100%">
        <strong>Compost Total Today: {{ totalCompost }}</strong>
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
        { text: 'Weight (kg)', align: 'center', sortable: true, value: 'weight' },
        { text: 'Type', align: 'left', sortable: true, value: 'type' },
        { text: 'Comments', align: 'left', sortable: false, value: 'comments' },
        { text: 'Time', align: 'center', sortable: true, value: 'timestamp' }
      ]
    }
  },
  created () {
    let stockWeights = []
    this.$firestore.collections.stock.filter(x => x.type === 'Compost').map(item => stockWeights.push(parseInt(item.weight)))
    this.totalCompost = stockWeights.reduce((a, b) => a + b, 0)
    return this.totalCompost
  }
}
</script>

<style>
  thead {
    background: #e5ece9;
  }
</style>
