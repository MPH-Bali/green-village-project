<template>
  <v-layout row>
  <v-container grid-list-lg>

    <template v-if="!confirmationResult">

      <v-layout row wrap>
        <v-flex xs12 md8 offset-md2 text-xs-center>
          <v-card>
            <v-card-text>
              <p class="title">To login, please enter your phone number</p>
              <v-flex text-xs-left>
                <label>Phone Number</label>
                <v-form>
                  <v-text-field solo flat label="Type Your Phone Number" type="tel" v-model="formData.phoneNumber" :disabled="loading" />
                </v-form>
              </v-flex>
              <v-btn id="confirmButton" color="primary" depressed style="text-transform: capitalize" @click.stop="confirm" :disabled="loading">
                <template v-if="loading">
                  <v-progress-circular indeterminate color="primary" />
                </template>
                <template v-else>
                  Continue
                </template>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

    </template>
    <template v-else>

      <v-layout row wrap>
        <v-flex xs12 md8 offset-md2 text-xs-center>
          <v-card>
            <v-card-text>
              <p class="title">Please enter the code we sent you via sms</p>
              <v-flex text-xs-left>
                <label>Code</label>
                <v-form>
                  <v-text-field solo flat label="Type Your Code" type="number" v-model="formData.confirmationCode" :disabled="loading" />
                </v-form>
              </v-flex>
              <v-btn color="primary" depressed style="text-transform: capitalize" @click.stop="login" :disabled="loading">
                <template v-if="loading">
                  <v-progress-circular indeterminate color="primary" />
                </template>
                <template v-else>
                  Login
                </template>              
              </v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

    </template>

  </v-container>
    <v-btn color="primary" depressed style="text-transform: capitalize" @click.stop="logout">Logout</v-btn>
  </v-layout>
</template>

<script>
import firebase from '@/firebase'
import router from '@/router'

export default {
  mounted () {
    var vm = this
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('confirmButton', {
      'size': 'invisible',
      'callback': function (response) {
        vm.loading = false
      }
    })
  },
  data () {
    return {
      formData: {
        phoneNumber: null,
        confirmationCode: null
      },
      loading: false,
      confirmationResult: null
    }
  },
  methods: {
    async confirm () {
      var vm = this
      this.loading = true
      var phoneNumber = this.formData.phoneNumber
      var appVerifier = window.recaptchaVerifier
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          vm.confirmationResult = confirmationResult
        }).catch(function (error) {
          // Error; SMS not sent
          // ...
          // Or, if you haven't stored the widget ID:
          console.log(error)
          window.recaptchaVerifier.render().then(function (widgetId) {
            window.grecaptcha.reset(widgetId)
          })
        })
    },
    async login () {
      var vm = this
      this.loading = true
      var code = this.formData.confirmationCode
      this.confirmationResult.confirm(code).then(function (result) {
        // User signed in successfully.
        var user = result.user
        // TODO create a new person in the database linking them to a uid
        console.log(user.uid)
        router.push(vm.$route.query.redirect || '/manager')
      }).catch(function (error) {
        // User couldn't sign in (bad verification code?)
        console.log(error)
      })
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
