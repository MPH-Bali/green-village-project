<template>
  <v-data-table
    :loading="$firestore.collectionsPending.stock"
    :headers="headers"
    :items="$firestore.list.stock"
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
            {{ materials.filter(x => x.type === 'Compost').reduce((total, item) => total + parseInt(item.weight || 0), 0) }}
          </span>
        </td>
        <td class="text-xs-center">
          <span class="body-2">
            {{ materials.filter(x => x.type === 'Plastics').reduce((total, item) => total + parseInt(item.weight || 0), 0) }}
          </span>
        </td>
        <td class="text-xs-center">
          <span class="body-2">
            {{ materials.filter(x => x.type === 'Metals').reduce((total, item) => total + parseInt(item.weight || 0), 0) }}
          </span>
        </td>
        <td class="text-xs-center">
          <span class="body-2">
            {{ materials.filter(x => x.type === 'Paper').reduce((total, item) => total + parseInt(item.weight || 0), 0) }}
          </span>
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
       { text: 'Compost', align: 'center', sortable: true, value: 'compost' },
       { text: 'Plastics', align: 'center', sortable: true, value: 'plastics' },
       { text: 'Metals', align: 'center', sortable: true, value: 'metal' },
       { text: 'Paper', align: 'center', sortable: true, value: 'paper' }
      ]
    }
  },
  computed: {
    materials () {
      return this.$firestore.list.stock
    }
  }
}
</script>

<style scoped>
  .elevation-1 thead {
    background: #e5ece9;
  }
</style>
