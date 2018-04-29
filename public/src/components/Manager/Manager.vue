<template>
  <v-app>
    <v-fade-transition>
      <loading-mask v-if="loading" />
    </v-fade-transition>

    <v-fade-transition>
      <menu v-if="showMenu" />
    </v-fade-transition>

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
        <v-btn flat @click="showMenu = !showMenu">
          <v-icon size="30px">menu</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <login v-if="user" />

    <unapproved v-else-if="person && !person.approved" />

	  <v-content v-else>
        <v-slide-y-transition mode="out-in">
        <router-view class="pb-5" @message="newMessage"/>
    	</v-slide-y-transition>
	  </v-content>

    <toast :message="toastMessage"/>

  </v-app>
</template>

<script>
import firebase, { db } from '@/firebase'

export default {
  name: 'Manager',
  created () {
    this.loading = true
    firebase.auth().onAuthStateChanged(async user => {
      if (!user) return false
      this.user = user

      // Attempt to get the person linked to this user, if it is the
      let qs = await db.collection('person').where('login', '==', user.uid).get()
      this.person = qs.docs && qs.docs[0] && qs.doc[0].data()

      if (!this.person) {
        let res = await db.collection('person').add({
          login: user.uid,
          phone: user.phoneNumber,
          type: { employee: true },
          role: { communityManager: true },
          approved: false
        })
        this.person = res.id
      }
      if (this.person && this.person.approved) {
        this.$sync({
          workers: this.$db.collection('person').where('type.employee', '==', true),
          buyers: this.$db.collection('person').where('type.buyer', '==', true),
          customers: this.$db.collection('person').where('type.customer', '==', true),
          banjar: this.$db.collection('banjar'),
          settings: this.$db.collection('settings')
        })
      }
      this.loading = false
    })
  },
  data () {
    return {
      user: null,
      person: null,
      loading: true,
      showMenu: false,
      toastMessage: {}
    }
  },
  methods: {
    newMessage (message) {
      this.toastMessage = message
      setTimeout(() => {
        this.toastMessage = {}
      }, 3000)
    }
  }
}
</script>

<style>
  .main-mph-btn img {
    height: 72%;
  }
</style>
