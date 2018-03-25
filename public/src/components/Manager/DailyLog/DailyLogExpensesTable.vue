<template>
  <v-data-table
    :loading="$firestore.collectionsPending.expenses"
    :headers="headers"
    :items="$firestore.dailyCollections.expenses"
    hide-actions class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ $moment(props.item.timestamp).format('hh:mm A') }}</td>
      <td class="text-xs-center">{{ props.item.type }}</td>
      <td class="text-xs-center">{{ props.item.cost }}</td>
      <td class="text-xs-center">{{ props.item.notes }}</td>
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
        { text: 'Type', align: 'center', sortable: true, value: 'type' },
        { text: 'Cost', align: 'center', sortable: true, value: 'cost' },
        { text: 'Notes', align: 'center', sortable: true, value: 'notes' }
      ]
    }
  }
}
</script>

<style scoped>
  .elevation-1 thead {
    background: #e5ece9;
  }
</style>
