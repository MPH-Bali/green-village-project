<template>
  <v-layout row>
    <v-flex xs12 md10 offset-md1 lg8 offset-lg2>
      <v-layout row wrap pt-4>
        <v-flex text-xs-center>
          <p class="title">
            <v-btn icon class="mr-3" @click="$router.push('/manager/daily-log/' + previousDay)">
              <v-icon>chevron_left</v-icon>
            </v-btn>
            <v-icon color="primary">event</v-icon>
            <span>{{ $moment(logDate).format('ddd, DD MMM YYYY') }}</span>
            <v-btn icon class="ml-3" @click="$router.push('/manager/daily-log/' + nextDay)">
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </p>
        </v-flex>
      </v-layout>

      <daily-log-header action="/manager/delivery-form" title="Delivery" />
      <delivery-table/>

      <daily-log-header class="mt-4" action="/manager/material" title="Material Kg" />
      <delivery-table/>

      <daily-log-header class="mt-4" action="/manager/delivery-form" title="Stock Kg" />
      <delivery-table/>

      <daily-log-header class="mt-4" action="/manager/delivery-form" title="Sales IDR" />
      <delivery-table/>

      <daily-log-header class="mt-4" action="/manager/delivery-form" title="Expenses IDR" />
      <delivery-table/>

      <daily-log-header class="mt-4" action="/manager/delivery-form" title="Workers Hours" />
      <delivery-table/>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    logDate () {
      const date = this.$moment(this.$route.params.date)
      const today = this.$moment().startOf('day')
      return today > date ? date : today
    },
    nextDay () {
      return this.$moment(this.logDate).add(1, 'day').format('YYYY-MM-DD')
    },
    previousDay () {
      return this.$moment(this.logDate).subtract(1, 'day').format('YYYY-MM-DD')
    }
  }
}
</script>
