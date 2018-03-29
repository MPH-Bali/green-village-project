<template>
  <v-layout row>
    <v-flex x12 lg8 offset-lg2>
      <v-layout row wrap>
        <v-flex xs12 sm6 px-5 py-2 v-for="item in items" :key="item.name">
          <v-btn
            large block
            color="blue-grey"
            class="white--text"
            @click="$router.push(item.path)"
            :disabled="!item.path">
            {{ item.name }}
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { name: this.$t('menu.sendDayReport') },
        { name: this.$t('menu.addDelivery'), path: '/manager/delivery-form' },
        { name: this.$t('menu.addDailyNote') },
        { name: this.$t('menu.weighMaterial'), path: '/material' },
        { name: this.$t('menu.customersList'), path: '/manager/customers' },
        { name: this.$t('menu.workersHours') },
        { name: this.$t('menu.buyersList'), path: '/manager/buyers' },
        { name: this.$t('menu.addStock') },
        { name: this.$t('menu.contactAdmin') },
        { name: this.$t('menu.createSale') },
        { name: this.$t('menu.logout'), path: '/manager/login' },
        { name: this.$t('menu.addExpense'), path: '/manager/expense' }
      ]
    }
  }
}
</script>
