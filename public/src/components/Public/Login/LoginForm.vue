<template>
  <v-layout column text-xs-center>
    <v-card class="py-5 my-5">
      <v-card-text class="py-5 my-5">
        <p class="title" style="text-transform: uppercase;">To login, please enter your phone number</p>
        <v-flex md4 offset-md4>
          <v-form>
            <v-flex ml-0 mt-3 pl-0 text-xs-left>
              <label class="loginLabel">Phone Number</label>
            </v-flex>
            <v-text-field
              class="loginField"
              name="phoneNumber" 
              autofocus
              solo 
              flat 
              label="Type Your Phone Number" 
              type="tel" 
              v-model="phoneNumber" 
              :disabled="loading" 
              @input="errorMessages = []" 
              :error="hasErrors" />
            <span v-for="(error, index) in errorMessages" :key="index" style="color: #ff5252;">{{error}}</span>
            <v-flex px-0 mt-3>
              <v-btn id="confirmButton" color="primary" depressed style="text-transform: uppercase" @click.stop="confirm" :loading="loading" block>Continue</v-btn>
            </v-flex>
          </v-form>
        </v-flex>
      </v-card-text>
    </v-card>  
  </v-layout>
</template>

<script>
import firebase from '@/firebase'

export default {
  mounted () {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('confirmButton', {
      size: 'invisible'
    })
  },
  computed: {
    hasErrors () {
      return this.errorMessages.length > 0
    }
  },
  data () {
    return {
      phoneNumber: null,
      loading: false,
      errorMessages: []
    }
  },
  methods: {
    async confirm () {
      try {
        this.loading = true
        let confirmationResult = await firebase.auth().signInWithPhoneNumber(this.phoneNumber, window.recaptchaVerifier)
        // SMS sent. Prompt user to type the code from the message.
        this.$emit('onVerification', confirmationResult)
        this.loading = false
      } catch (error) {
        // Error SMS not sent
        this.errorMessages.push(error.message)
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
  .loginLabel {
    font-size: 16px;
    font-weight: 600;
  }

  .loginField {
    background-color:  rgba(66, 133, 61, 0.1) !important;
  }
</style>
