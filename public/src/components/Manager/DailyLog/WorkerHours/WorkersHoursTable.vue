<template>
  <v-data-table
    :loading="$firestore.collectionsPending.workerhours"
    :headers="headers"
    :items="this.$firestore.dailyCollections.workerhours"
    hide-actions class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ props.item.worker.name }}</td>
      <td class="text-xs-center">{{ getTime(props.item.times.in) }}</td>
      <td class="text-xs-center">{{ getTime(props.item.times.out) }}</td>
      <td class="text-xs-center">
        <v-btn icon @click="$router.push({ name: 'workerHours', params: { id: props.item.id }})">
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
        { text: this.$t('tables.headers.timeIn'), align: 'center', sortable: true, value: 'in' },
        { text: this.$t('tables.headers.timeOut'), align: 'center', sortable: true, value: 'out' },
        { text: this.$t('tables.headers.actions'), align: 'center', sortable: true, value: 'action' }
      ]
    }
  },
  methods: {
    getTime (time) {
      if (time) {
        return this.$moment(time).format('hh:mm a')
      }
      return ''
    }
  }
}
</script>

<style >
  .elevation-1 thead {
    background: #e5ece9;
  }
</style>
