<template>
  <v-app>
    <v-toolbar flat class="elevation-1" app color="secondary" clipped-left>
      <v-toolbar-items class="ml-0">
        <v-btn flat color="primary" @click="$router.push('/')" class="main-mph-btn">
         <img src="../../../static/icons/icon-72x72.png">
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
	  <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view class="pb-5" @message="newMessage"/>
    	</v-slide-y-transition>
	  </v-content>
    <toast :message="toastMessage"/>
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
  .main-mph-btn img {
    height: 72%;
  }
</style>
