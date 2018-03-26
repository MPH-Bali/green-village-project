<template>
  <v-container grid-list-lg>
    <p class="display-3 text-xs-center">Menu</p>
      <v-layout wrap>
        <template v-for="(item, index) in items">
          <v-flex xs12 sm6 :key="index">
            <MenuItem :name="item.name" :position="index" :path="item.path" />
          </v-flex>
        </template>
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
        { name: 'SEND DAY REPORT', path: '/manager/daily-log' },
        { name: 'ADD DELIVERY', path: '/manager/delivery-form' },
        { name: 'ADD DAILY NOTE', path: '/manager/daily-log' },
        { name: 'WEIGH MATERIAL', path: '/material' },
        { name: 'CUSTOMERS LIST', path: '/manager/daily-log' },
        { name: 'WORKERS HOURS', path: '/manager/daily-log' },
        { name: 'BUYERS LIST', path: '/manager/buyers' },
        { name: 'ADD STOCK', path: '/manager' },
        { name: 'CONTACT ADMIN', path: '/manager' },
        { name: 'CREATE SALE', path: '/manager' },
        { name: 'LOGOUT', path: '/manager/login' },
        { name: 'ADD EXPENSE', path: '/manager/expense' }
      ]
    }
  }
}
</script>
