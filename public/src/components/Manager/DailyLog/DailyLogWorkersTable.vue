<template>
  <v-data-table
    :loading="$firestore.collectionsPending.workertimes"
    :headers="headers"
    :items="workertimes"
    hide-actions class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ props.item.worker.name }}</td>
      <td class="text-xs-center">{{ $moment(props.item.times.morning.start).format('HH:MM') }}</td>
      <td class="text-xs-center">{{ $moment(props.item.times.morning.end).format('HH:MM') }}</td>
      <td class="text-xs-center">{{ $moment(props.item.times.afternoon.start).format('HH:MM') }}</td>
      <td class="text-xs-center">{{ $moment(props.item.times.afternoon.end).format('HH:MM') }}</td>
    </template>
  </v-data-table>
</template>

<script>

export default {
  data () {
    return {
      loading: false,
      headers: [
        { text: 'Name', align: 'center', sortable: true, value: 'name' },
        { text: 'Morning In', align: 'center', sortable: true, value: 'morning_in' },
        { text: 'Morning Out', align: 'center', sortable: true, value: 'morning_out' },
        { text: 'In', align: 'center', sortable: true, value: 'afternoon_in' },
        { text: 'Out', align: 'center', sortable: true, value: 'afternoon_out' }
      ]
    }
  },
  computed: {
    workertimes () {
      console.log(this.$firestore.dailyCollections.workertimes)
      return this.$firestore.dailyCollections.workertimes
    }
  }
}
</script>

<style >
  .elevation-1 thead {
    background: #e5ece9;
  }
</style>
