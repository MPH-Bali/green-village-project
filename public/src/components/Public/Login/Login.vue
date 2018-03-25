<template>
  <v-container grid-list-lg>
    <template v-if="!loggedIn">
      <confirmation-form v-if="confirmationResult" :confirmationResult="confirmationResult" />
      <login-form v-else @onVerification="onVerification" />
    </template>
    <template v-else>
      <v-layout class="logoutButtonContainer">
        <!-- temporarily stick a logout button here when we are logged in, until we have somewhere better to put it -->
        <v-btn color="primary" depressed style="text-transform: capitalize" @click.stop="logout">Logout</v-btn>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import { auth } from '@/firebase'
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
        await auth.signOut()
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

  .logoutButtonContainer {
    justify-content: center;
  }
</style>
