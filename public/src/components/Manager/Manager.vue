<template>
  <v-app>
    <v-fade-transition>
      <template v-if="$firestore.loading">
          <loading-mask />
      </template>
    </v-fade-transition>
    <v-toolbar flat class="elevation-1" app color="secondary" clipped-left>
      <v-toolbar-items class="ml-0">
        <v-btn flat color="primary" @click="$router.push('/')" class="main-mph">
         <img src="../../assets/mph_logo.png">
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-title v-text="$t(`routeNames.${$route.name}`)" />
      <v-spacer />
      <v-toolbar-items class="mr-0">
        <v-btn flat @click="clickMenu">
          <v-icon size="30px">menu</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <login v-if="!$firestore.user" />
    <unapproved v-else-if="$firestore.person && !$firestore.person.approved" />
    <template v-else>
	  <v-content>
        <v-slide-y-transition mode="out-in">
        <router-view class="pb-5" @message="newMessage"/>
    	</v-slide-y-transition>
	  </v-content>
      <Toast :message="toastMessage"/>
    </template>
  </v-app>
</template>

<script>
import LoadingMask from './LoadingMask'
import Login from '@/components/Manager/Login/Login'
import Unapproved from '@/components/Manager/Login/Unapproved'
import Toast from './UI/Toast'

export default {
  name: 'Manager',
  created () {
    this.$firestore.initStore()
  },
  components: {
    LoadingMask,
    Login,
    Unapproved,
    Toast
  },
  data () {
    return {
      menuOpened: false,
      toastMessage: {},
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
  },
  methods: {
    newMessage (message) {
      this.toastMessage = message
      setTimeout(() => {
        this.toastMessage = {}
      }, 3000)
    },
    clickMenu () {
      if (this.menuOpened) {
        this.menuOpened = false
        this.$router.go(-1)
      } else {
        this.menuOpened = true
        this.$router.push('/manager/menu')
      }
    }
  }
}
</script>

<style>
  .main-mph img {
    height: 50px;
  }
</style>
