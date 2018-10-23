<template>
  <v-container grid-list-lg>
    <confirmation-form
      v-if="confirmationResult"
      :confirmationResult="confirmationResult"
      @onResend="onResend" />
    <login-form v-else @onVerification="onVerification" />
  </v-container>
</template>

<script>
export default {
  mounted () {
    if (this.$firestore.user) {
      try {
        this.$firebase.auth().signOut()
        this.$firestore.user = null
        this.$firestore.person = null
      } catch (error) {
        console.log(`Error logging out: ${error}`)
      }
    }
  },
  data () {
    return {
      confirmationResult: null
    }
  },
  methods: {
    onVerification (confirmationResult) {
      this.confirmationResult = confirmationResult
      this.$router.push('/manager/')
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
