<template>
  <v-data-table
    :loading="$firestore.collectionsPending.stock"
    :headers="headers"
    :items="$firestore.collections.stock"
    hide-actions class="elevation-1"
  >
    <template slot="items" slot-scope="props" v-if="!collapsed" >
      <td class="text-xs-center">{{ $moment(props.item.timestamp).format('hh:mm A') }}</td>
      <td class="text-xs-center">{{ props.item.weight  }}</td>
      <td class="text-xs-center">{{ props.item.type }}</td>
      <td class="text-xs-center">{{ props.item.comments }}</td>
    </template>
    {{ stock }}
    <template slot="footer">
      <tr class="secondary pointer" @click.stop="collapsed = !collapsed">
        <td class="text-xs-center">
          <span class="body-2">
            {{ totalCompost }}
          </span>
        </td>
        <td class="text-xs-center">
          <span class="body-2">
            {{ totalPlastics }}
          </span>
        </td>
        <td class="text-xs-center">
          <span class="body-2">
            {{ totalMetals }}
          </span>
        </td>
        <td class="text-xs-center">
          <span class="body-2">
            {{ totalPaper }}
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
  mounted () {
    let compostWeight = []
    let plasticsWeight = []
    let metalsWeight = []
    let paperWeight = []
    this.$firestore.collections.stock.filter(x => x.type === 'Compost').map(item => compostWeight.push(parseInt(item.weight)))
    this.$firestore.collections.stock.filter(x => x.type === 'Plastics').map(item => plasticsWeight.push(parseInt(item.weight)))
    this.$firestore.collections.stock.filter(x => x.type === 'Metals').map(item => metalsWeight.push(parseInt(item.weight)))
    this.$firestore.collections.stock.filter(x => x.type === 'Paper').map(item => paperWeight.push(parseInt(item.weight)))
    this.totalCompost = compostWeight.reduce((a, b) => a + b, 0)
    this.totalPlastics = plasticsWeight.reduce((a, b) => a + b, 0)
    this.totalMetals = metalsWeight.reduce((a, b) => a + b, 0)
    this.totalPaper = paperWeight.reduce((a, b) => a + b, 0)
  }
}
</script>

<style scoped>
  .elevation-1 thead {
    background: #e5ece9;
  }
</style>
