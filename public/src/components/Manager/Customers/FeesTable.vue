<template>
  <v-data-table
    class="elevation-1"
    :headers="headers"
    :items="$store.customerFees.data"
    :loading="$store.customerFees.pending"
    hide-actions>
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">
        {{ $moment(props.item.timestamp).format('DD/MM/YYYY') }}
      </td>
      <td class="text-xs-center">
        {{ props.item.monthlyFee }}
      </td>
      <td class="text-xs-center">
        {{ props.item.totalPaid }}
      </td>
      <td class="text-xs-center">
        {{ $moment(props.item.paidUntil).format('DD/MM/YYYY') }}
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { text: this.$t('models.fees.timestamp'), value: 'timestamp', align: 'center' },
        { text: this.$t('models.fees.monthlyFee'), value: 'monthlyFee', align: 'center' },
        { text: this.$t('models.fees.totalPaid'), value: 'totalPaid', align: 'center' },
        { text: this.$t('models.fees.paidUntil'), value: 'paidUntil', align: 'center' }
      ]
    }
  }
}
</script>
