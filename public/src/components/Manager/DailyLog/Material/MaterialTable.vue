<template>
  <v-data-table
    :headers="headers"
    :items="materials"
    :loading="$store.material.pending"
    hide-actions class="elevation-1">
    <template slot="items" slot-scope="props" v-if="!collapsed" >
      <td class="text-xs-center">{{ $moment(props.item.timestamp).format('hh:mm A') }}</td>
      <td class="text-xs-center">{{ props.item.worker.name }}</td>
      <td class="text-xs-center">{{ props.item.inorganic }}</td>
      <td class="text-xs-center">{{ props.item.organic }}</td>
      <td class="text-xs-center">
        {{ (props.item.banjar && props.item.banjar.name) || '-' }}
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
        { text: this.$t('tables.headers.time'), align: 'center', sortable: true, value: 'timestamp' },
        { text: this.$t('tables.headers.worker'), align: 'center', sortable: true, value: 'worker' },
        { text: this.$t('tables.headers.inorganic'), align: 'center', sortable: true, value: 'Inorganic' },
        { text: this.$t('tables.headers.organic'), align: 'center', sortable: true, value: 'organic' },
        { text: this.$t('tables.headers.banjar'), align: 'center', sortable: true, value: 'banjar' }
      ]
    }
  },
  computed: {
    materials () {
      return this.$store.material.data || []
    }
  }
}
</script>
