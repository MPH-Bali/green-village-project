<template>
  <v-data-table
    :headers="headers"
    :items="$store.expense.data || []"
    :loading="$store.expense.pending"
    hide-actions class="elevation-1">
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
        { text: this.$t('tables.headers.time'), align: 'center', sortable: true, value: 'timestamp' },
        { text: this.$t('tables.headers.type'), align: 'center', sortable: true, value: 'type' },
        { text: this.$t('tables.headers.cost'), align: 'center', sortable: true, value: 'cost' },
        { text: this.$t('tables.headers.notes'), align: 'center', sortable: true, value: 'notes' }
      ]
    }
  }
}
</script>

