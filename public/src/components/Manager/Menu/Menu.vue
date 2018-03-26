<template>
  <v-container grid-list-lg>
    <p class="display-3 text-xs-center">Menu</p>
      <v-layout wrap>
        <template v-for="(item, index) in items">
          <v-flex xs12 sm6>
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
        { name: this.$t('menu.sendDayReport'), path: '/manager' },
        { name: this.$t('menu.addDelivery'), path: '/manager/delivery-form' },
        { name: this.$t('menu.addDailyNote'), path: '/manager' },
        { name: this.$t('menu.weighMaterial'), path: '/material' },
        { name: this.$t('menu.customersList'), path: '/manager/customers' },
        { name: this.$t('menu.workersHours'), path: '/manager' },
        { name: this.$t('menu.buyersList'), path: '/manager/buyers' },
        { name: this.$t('menu.addStock'), path: '/manager' },
        { name: this.$t('menu.contactAdmin'), path: '/manager' },
        { name: this.$t('menu.createSale'), path: '/manager' },
        { name: this.$t('menu.logout'), path: '/manager' },
        { name: this.$t('menu.addExpense'), path: '/manager/expense' }
      ]
    }
  }
}
</script>
