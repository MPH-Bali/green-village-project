<template>
  <v-data-table
    :loading="$firestore.collectionsPending.stock"
    :headers="headers"
    :items="items"
    hide-actions class="elevation-1">
    <template slot="items" slot-scope="props">
      <td>{{ props.item.weight }}</td>
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
        <strong>{{ materialType }} Total Today: {{ totalWeight }}</strong>
      </td>
    </template>
  </v-data-table>
</template>

<script>

export default {
  props: {
    materialType: { type: String, required: true }
  },
  computed: {
    items () {
      return this.$firestore.list.stock.filter(x => x.type === this.materialType)
    },
    totalWeight () {
      return this.items.reduce((total, item) => total + parseInt(item.weight), 0)
    }
  },
  data () {
    return {
      loading: false,
      timestamp: new Date(),
      headers: [
        { text: 'Weight (kg)', align: 'center', sortable: true, value: 'weight' },
        { text: 'Comments', align: 'left', sortable: false, value: 'comments' },
        { text: 'Time', align: 'center', sortable: true, value: 'timestamp' },
        { text: 'Edit', align: 'center', sortable: false, value: null }
      ]
    }
  }
}
</script>
