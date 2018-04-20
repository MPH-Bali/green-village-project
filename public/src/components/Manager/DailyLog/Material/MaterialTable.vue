<template>
  <v-data-table
    :headers="[
      { text: $t('tables.headers.time'), align: 'center', value: 'timestamp' },
      { text: $t('tables.headers.worker'), align: 'center', value: 'worker' },
      { text: $t('tables.headers.inorganic'), align: 'center', value: 'Inorganic' },
      { text: $t('tables.headers.organic'), align: 'center', value: 'organic' },
      { text: $t('tables.headers.banjar'), align: 'center', value: 'banjar' }
    ]"
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
      collapsed: true
    }
  },
  computed: {
    materials () {
      return this.$store.material.data || []
    }
  }
}
</script>
