<template>
  <v-data-table
    :loading="$firestore.collectionsPending.workertimes"
    :headers="headers"
    :items="this.$firestore.dailyCollections.workertimes"
    hide-actions class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ props.item.worker.name }}</td>
      <td class="text-xs-center">{{ getTime(props.item.times.in) }}</td>
      <td class="text-xs-center">{{ getTime(props.item.times.out) }}</td>
      <td class="text-xs-center">
        <v-btn icon @click="$router.push({ name: 'workerTimes', params: { id: props.item.id }})">
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
        { text: 'Name', align: 'center', sortable: true, value: 'name' },
        { text: 'Time In', align: 'center', sortable: true, value: 'in' },
        { text: 'Time Out', align: 'center', sortable: true, value: 'out' },
        { text: 'Actions', align: 'center', sortable: true, value: 'action' }
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
