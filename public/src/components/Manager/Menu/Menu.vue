<template>
  <v-container grid-list-lg>
      <v-layout wrap>
        <v-flex xs12 sm6 v-for="(item, index) in items" :key="item.name">
          <MenuItem :name="item.name"
            :position="index"
            :path="item.path"
            :disabled="item.disabled" />
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import MenuItem from './MenuItem.vue'
export default {
  components: {
    MenuItem
  },
  data () {
    return {
      items: [
        { name: 'SEND DAY REPORT', path: '/manager/daily-log', disabled: true },
        { name: 'ADD DELIVERY', path: '/manager/delivery-form' },
        { name: 'ADD DAILY NOTE', path: '/manager/daily-log', disabled: true },
        { name: 'WEIGH MATERIAL', path: '/manager/material' },
        { name: 'CUSTOMERS LIST', path: '/manager/customers' },
        { name: 'WORKERS HOURS', path: '/manager/daily-log', disabled: true },
        { name: 'BUYERS LIST', path: '/manager/buyers' },
        { name: 'ADD STOCK', path: '/manager/stock' },
        { name: 'CONTACT ADMIN', path: '/contact-us' },
        { name: 'CREATE SALE', path: '/manager/daily-log', disabled: true },
        { name: 'LOGOUT', path: '/manager/daily-log', disabled: true },
        { name: 'ADD EXPENSE', path: '/manager/expense' }
      ]
    }
  }
}
</script>
