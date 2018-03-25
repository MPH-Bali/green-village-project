<template>
  <v-app>
    <div v-if="loading"></div> 
    <template v-else >
      <v-toolbar flat class="elevation-1" app color="secondary" clipped-left>
        <v-toolbar-items class="ml-0">
          <v-btn flat color="primary" @click="$router.push('/manager')">
            <v-icon>fa-recycle</v-icon>
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

      <login v-if="!user" />
      <unapproved v-else-if="!userApproved" />
      <template v-else>
        <v-content>
          <v-slide-y-transition mode="out-in">
            <router-view />
          </v-slide-y-transition>
        </v-content>
        <v-bottom-nav app :value="$route.path" v-if="$route.path !== '/manager/login'" color="grey darken-4">
          <v-btn
            flat
            color="primary"
          :value="section.route"
            v-for="section in sections"
          :key="section.name"
          @click.stop="$router.push(section.route)"
          >
            <span class="mt-1">{{ section.name }}</span>
            <v-icon icon="blue" class="mt-1" size="20px">{{ section.icon }}</v-icon>
          </v-btn>
        </v-bottom-nav>
      </template>
    </template>
  </v-app>
</template>
<script>
import Login from '@/components/Manager/Login/Login'
import Unapproved from '@/components/Manager/Login/Unapproved'

export default {
  name: 'Manager',
  async created () {
    // Listen to when auth state changed (firebase initialized)
    this.$firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.user = user
        let person = await this.$firestore.getUserByUid(user.uid)
        if (person && person.approved) {
          this.userApproved = person.approved
          this.$firestore.changeDate()
          this.$firestore.syncData()
        }
      }

      this.loading = false
    })
  },
  components: {
    Login,
    Unapproved
  },
  data () {
    return {
      loading: true,
      user: null,
      userApproved: false,
      sections: [
        {
          name: this.$i18n.t('bottomMenu.dailyLog'),
          icon: 'fa-calendar-alt',
          route: '/manager'
        },
        {
          name: this.$i18n.t('bottomMenu.addDelivery'),
          icon: 'fa-truck',
          route: '/manager/delivery'
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
