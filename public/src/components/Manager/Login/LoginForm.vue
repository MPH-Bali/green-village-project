<template>
  <v-layout column text-xs-center>
    <v-card class="py-5 my-5">
      <v-card-text class="py-5 my-5">
        <p class="title">TO LGOIN, PLEASE ENTER YOUR PHONE NUMBER</p>
        <v-flex md4 offset-md4>
          <v-form @submit.prevent="confirm">
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
            <p class="errorMessage" v-for="(error, index) in errorMessages" :key="index" style="color: #ff5252;">{{error}}</p>
            <v-flex px-0 mt-3>
              <v-btn
                id="confirmButton"
                color="primary"
                depressed
                style="text-transform: uppercase"
                @click.stop="confirm"
                :loading="loading"
                block>
                Continue
              </v-btn>
            </v-flex>
          </v-form>
        </v-flex>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  mounted () {
    this.recaptchaVerifier = new this.$firebase.auth.RecaptchaVerifier('confirmButton', {
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
      recaptchaVerifier: null,
      phoneNumber: null,
      loading: false,
      errorMessages: []
    }
  },
  methods: {
    async confirm () {
      try {
        this.loading = true
        let { signInWithPhoneNumber } = this.$firebase.auth()
        let confirmationResult = await signInWithPhoneNumber(
          this.phoneNumber,
          this.recaptchaVerifier
        )
        // SMS sent. Prompt user to type the code from the message.
        this.$emit('onVerification', confirmationResult)
        this.loading = false
      } catch (error) {
        // Error SMS not sent
        this.errorMessages = []
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

  .errorMessage {
    margin-top: 10px;
  }
</style>
