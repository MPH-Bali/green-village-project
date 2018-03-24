<template>
  <v-container grid-list-lg>
    <v-layout v-if="!loggedIn" column text-xs-center>
      <confirmation-form v-if="confirmationResult" :confirmationResult="confirmationResult" />
      <login-form v-else @onVerification="onVerification" />
    </v-layout>
    <v-layout class="logoutButtonContainer" v-else>
      <v-btn color="primary" depressed style="text-transform: capitalize" @click.stop="logout">Logout</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import firebase, { auth } from '@/firebase'
import LoginForm from './LoginForm'
import ConfirmationForm from './ConfirmationForm'

export default {
  components: {
    LoginForm,
    ConfirmationForm
  },
  data () {
    return {
      confirmationResult: null
    }
  },
  computed: {
    loggedIn () {
      return auth.currentUser
    }
  },
  methods: {
    onVerification (confirmationResult) {
      this.confirmationResult = confirmationResult
    },
    async logout () {
      try {
        await firebase.auth().signOut()
      } catch (error) {
        console.log(`Error logging out: ${error}`)
      }
    }
  }
}
</script>

<style scoped>
  .container.grid-list-lg {
    height: calc(100% - 54px);
  }

  .layout.column {
    height: 100%;
    justify-content: center;
  }

  .loginLabel {
    font-size: 16px;
    font-weight: 600;
  }

  .logoutButtonContainer {
    justify-content: center;
  }
</style>
