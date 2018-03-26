<template>
  <v-data-table
    :loading="loading"
    :headers="headers"
    :items="deliveriesAsArray"
    hide-actions class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ $moment(props.item.timestamp).format('hh:mm A') }}</td>
      <td class="text-xs-center">{{ parseInt(props.item.organic) + parseInt(props.item.anorganic) }}</td>
      <td class="text-xs-center">{{ props.item.organic }}</td>
      <td class="text-xs-center">{{ props.item.anorganic }}</td>
      <td class="text-xs-center">{{ props.item.households }}</td>
      <td>{{ props.item.driver }}</td>
      <td>{{ props.item.banjar }}</td>
      <td>{{ props.item.comments }}</td>
      <td class="text-xs-center">
        <v-btn icon @click="$router.push({ name: 'Delivery Form', params: { id: props.item.id }})">
          <v-icon size="17px" color="primary">fa-edit</v-icon>
        </v-btn>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      loading: false,
      headers: [
        { text: 'Weight', align: 'center', sortable: true, value: 'total' },
        { text: 'Organic', align: 'center', sortable: true, value: 'organic' },
        { text: 'Anorganic', align: 'center', sortable: true, value: 'anorganic' },
        { text: 'Housholds', align: 'center', sortable: true, value: 'households' },
        { text: 'Driver', align: 'left', sortable: true, value: 'driver' },
        { text: 'Banjar', align: 'left', sortable: true, value: 'banjar' },
        { text: 'Comments', align: 'left', sortable: false, value: 'comments' },
        { text: 'Actions', align: 'center', sortable: false, value: null }
      ]
    }
  },
  computed: {
    ...mapGetters({
      deliveries: 'delivery/getDailyList'
    }),
    deliveriesAsArray () {
      return Object.keys(this.deliveries).map(id => this.deliveries[id])
    },
    logDate () {
      const date = this.$moment(this.$route.params.date)
      const today = this.$moment().startOf('day')
      return today > date ? date : today
    }
  },
  methods: {
    ...mapActions({
      fetchDeliveries: 'delivery/fetchDailyList'
    })
  },
  async created () {
    this.loading = true
    const result = await this.fetchDeliveries({ date: this.logDate })
    this.loading = false
    if (!result.success) {
      console.log(result.error)
      // make toast
    }
  }
}
</script>

<style>
  thead {
    background: #e5ece9;
  }
</style>
