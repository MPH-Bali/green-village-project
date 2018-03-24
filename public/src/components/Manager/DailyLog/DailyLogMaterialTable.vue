<template>
  <v-data-table
    :loading="$firestore.collectionsPending.material"
    :headers="headers"
    :items="$firestore.dailyCollections.material"
    hide-actions class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ $moment(props.item.timestamp).format('hh:mm A') }}</td>
      <td class="text-xs-center">{{ props.item.worker.name }}</td>
      <td class="text-xs-center">{{ props.item.inorganic }}</td>
      <td class="text-xs-center">{{ props.item.anorganic }}</td>
      <td class="text-xs-center">
        <template v-if="props.item.banjar">
          {{ props.item.banjar.name }}
        </template>
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
        { text: 'Worker', align: 'center', sortable: true, value: 'worker' },
        { text: 'Inorganic', align: 'center', sortable: true, value: 'Inorganic' },
        { text: 'Organic', align: 'center', sortable: true, value: 'organic' },
        { text: 'Banjar', align: 'center', sortable: true, value: 'banjar' }
      ]
    }
  }
}
</script>

<style >
  .elevation-1 thead {
    background: #e5ece9;
  }
</style>
