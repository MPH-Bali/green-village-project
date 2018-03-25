<template>
  <v-container grid-list-lg>
    <template v-if="!loggedIn">
      <confirmation-form v-show="confirmationResult" :confirmationResult="confirmationResult" @onResend="onResend" />
      <login-form v-show="!confirmationResult" @onVerification="onVerification" />
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
      return this.$firebase.auth().currentUser
    }
  },
  methods: {
    onVerification (confirmationResult) {
      this.confirmationResult = confirmationResult
    },
    onResend () {
      this.confirmationResult = null
    },
    async logout () {
      try {
        await this.$firebase.auth().signOut()
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
