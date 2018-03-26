<template>
  <v-container grid-list-lg>
    <confirmation-form 
      v-show="confirmationResult" 
      :confirmationResult="confirmationResult" 
      @onResend="onResend" />
    <login-form v-show="!confirmationResult" @onVerification="onVerification" />
  </v-container>
</template>

<script>
import LoginForm from './LoginForm'
import ConfirmationForm from './ConfirmationForm'

export default {
  mounted () {
    if (this.$firebase.user) {
      try {
        this.$firebase.auth().signOut()
      } catch (error) {
        console.log(`Error logging out: ${error}`)
      }
    }
  },
  components: {
    LoginForm,
    ConfirmationForm
  },
  data () {
    return {
      confirmationResult: null
    }
  },
  methods: {
    onVerification (confirmationResult) {
      this.confirmationResult = confirmationResult
    },
    onResend () {
      this.confirmationResult = null
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
