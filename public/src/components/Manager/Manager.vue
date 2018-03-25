<template>
  <v-app>
    <v-toolbar flat class="elevation-1" app color="secondary" clipped-left>
      <v-toolbar-items class="ml-0">
        <v-btn flat color="primary" @click="$router.push('/manager')" class="main-mph">
         <img src="../../assets/mph_logo.png">
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-title v-text="$t(`routeNames.${$route.name}`)" />
      <v-spacer />
      <v-toolbar-items class="mr-0">
        <v-btn flat>
          <v-icon size="30px">menu</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view />
      </v-slide-y-transition>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: 'Manager',
  created () {
    this.$firestore.changeDate()
    this.$firestore.syncData()
  },
  data () {
    return {
      sections: [
        {
          name: this.$i18n.t('bottomMenu.dailyLog'),
          icon: 'fa-calendar-alt',
          route: '/manager'
        },
        {
          name: this.$i18n.t('bottomMenu.addDelivery'),
          icon: 'fa-truck',
          route: '/manager/delivery-form'
        },
        {
          name: this.$i18n.t('bottomMenu.weighMaterials'),
          icon: 'fa-weight',
          route: '/manager/material'
        },
        {
          name: this.$i18n.t('bottomMenu.workerHours'),
          icon: 'fa-clock',
          route: '/manager/hours'
        },
        {
          name: this.$i18n.t('bottomMenu.addStock'),
          icon: 'fa-cubes',
          route: '/manager/stock'
        },
        {
          name: this.$i18n.t('bottomMenu.createSale'),
          icon: 'fa-credit-card',
          route: '/manager/sale'
        },
        {
          name: this.$i18n.t('bottomMenu.addExpense'),
          icon: 'fa-money-bill-alt',
          route: '/manager/expense'
        },
        {
          name: this.$i18n.t('bottomMenu.settings'),
          icon: 'fa-cog',
          route: '/manager/settings'
        }
      ]
    }
  }
}
</script>

<style>
  .main-mph img {
    height: 50px;
  }
</style>
