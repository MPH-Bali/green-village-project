<template>
  <v-data-table
    :loading="$firestore.collectionsPending.material"
    :headers="headers"
    :items="$firestore.dailyCollections.material"
    hide-actions class="elevation-1"
  >
    <template slot="items" slot-scope="props" v-if="!collapsed" >
      <td class="text-xs-center">{{ $moment(props.item.timestamp).format('hh:mm A') }}</td>
      <td class="text-xs-center">{{ props.item.worker.name }}</td>
      <td class="text-xs-center">{{ props.item.inorganic }}</td>
      <td class="text-xs-center">{{ props.item.organic }}</td>
      <td class="text-xs-center">
        <template v-if="props.item.banjar">
          {{ props.item.banjar.name }}
        </template>
      </td>
    </template>
    {{ materials }}
    <template slot="footer">
      <tr class="secondary pointer" @click.stop="collapsed = !collapsed">
        <td class="text-xs-center">
          <span class="body-2">
            --
          </span>
        </td>
        <td class="text-xs-center">
          <span class="body-2">
            --
          </span>
        </td>
        <td class="text-xs-center">
          <span class="body-2">
            {{ materials.reduce((total, item) => total + parseInt(item.inorganic || 0), 0) }}
          </span>
        </td>
        <td class="text-xs-center">
          <span class="body-2">
            {{ materials.reduce((total, item) => total + parseInt(item.organic || 0), 0) }}
          </span>
        </td>
        <td colspan="2">
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>

export default {
  data () {
    return {
      collapsed: true,
      loading: false,
      headers: [
        { text: 'Time', align: 'center', sortable: true, value: 'timestamp' },
        { text: 'Worker', align: 'center', sortable: true, value: 'worker' },
        { text: 'Inorganic', align: 'center', sortable: true, value: 'Inorganic' },
        { text: 'Organic', align: 'center', sortable: true, value: 'organic' },
        { text: 'Banjar', align: 'center', sortable: true, value: 'banjar' }
      ]
    }
  },
  computed: {
    materials () {
      return this.$firestore.list.material
    }
  }
}
</script>

<style scoped>
  .elevation-1 thead {
    background: #e5ece9;
  }
</style>
