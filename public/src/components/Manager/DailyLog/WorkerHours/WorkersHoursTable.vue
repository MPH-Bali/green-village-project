<template>
  <v-data-table
    :loading="$store.workerhours.pending"
    :headers="headers"
    :items="$store.workerhours.data || []"
    hide-actions class="elevation-1">
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ props.item.worker.name }}</td>
      <td class="text-xs-center">{{ $moment(props.item.checkIn).format('hh:mm a') }}</td>
      <td class="text-xs-center">{{ $moment(props.item.checkOut).format('hh:mm a') }}</td>
      <td class="text-xs-center">
        <v-btn icon @click="$router.push({ name: 'workerHoursForm', params: { id: props.item.id }})">
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
        { text: this.$t('tables.headers.name'), align: 'center', sortable: true, value: 'name' },
        { text: this.$t('tables.headers.timeIn'), align: 'center', sortable: true, value: 'checkIn' },
        { text: this.$t('tables.headers.timeOut'), align: 'center', sortable: true, value: 'checkOut' },
        { text: this.$t('tables.headers.actions'), align: 'center', value: null }
      ]
    }
  }
}
</script>
