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
      <toast :message="toastMessage"/>
    </template>
  </v-app>
</template>

<script>
import LoadingMask from './LoadingMask'
import Login from '@/components/Manager/Login/Login'
import Unapproved from '@/components/Manager/Login/Unapproved'

export default {
  name: 'Manager',
  created () {
    this.$firestore.initStore()
  },
  components: {
    LoadingMask,
    Login,
    Unapproved
  },
  data () {
    return {
      menuOpened: false,
      toastMessage: {}
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
