<template>
  <v-container grid-list-lg>
    <v-layout column text-xs-center>
      <v-card v-if="!confirmationResult" class="py-5 my-5">
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
                ref="phoneNumber" 
                solo 
                flat 
                label="Type Your Phone Number" 
                type="tel" 
                v-model="formData.phoneNumber" 
                :disabled="loading" 
                @input="errorMessages = []" 
                :error="hasErrors" />
              <span v-for="(error, index) in errorMessages" :key="index" style="color: #ff5252;">{{error}}</span>
              <v-flex px-0 mt-3>
               <v-btn id="confirmButton" color="primary" depressed style="text-transform: capitalize" @click.stop="confirm" :loading="loading" block>Continue</v-btn>
              </v-flex>
            </v-form>
          </v-flex>
        </v-card-text>
      </v-card>

      <v-card v-else class="py-5 my-5">
        <v-card-text class="py-5 my-5">
          <p class="title" style="text-transform: uppercase;">Please enter the code we sent you via sms</p>
          <v-flex md4 offset-md4>
            <v-form>
              <v-flex ml-0 mt-3 pl-0 text-xs-left>
                <label class="loginLabel">Code</label>
              </v-flex>
                <v-text-field 
                  class="loginField"
                  name="confirmationCode" 
                  ref="confirmationCode" 
                  solo 
                  flat 
                  label="Type Your Code" 
                  type="number" 
                  v-model="formData.confirmationCode" 
                  :disabled="loading" 
                  @input="errorMessages = []" 
                  :error="hasErrors" />                
              <span v-for="(error, index) in errorMessages" :key="index" style="color: #ff5252;">{{error}}</span>
              <v-flex px-0 mt-3>
               <v-btn id="confirmButton" color="primary" depressed style="text-transform: capitalize" @click.stop="login" :loading="loading" block>Login</v-btn>
              </v-flex>
            </v-form>
          </v-flex>
        </v-card-text>
      </v-card>      
    </v-layout>

    <!--
    <v-layout v-else>
      <v-flex xs12 md8 offset-md2 text-xs-center>
        <v-card>
          <v-card-text>
            <p class="title">Please enter the code we sent you via sms</p>
            <v-flex text-xs-left>
              <v-form>
                <label for="confirmationCode">Code</label>
                <v-text-field 
                  name="confirmationCode" 
                  ref="confirmationCode" 
                  solo 
                  flat 
                  label="Type Your Code" 
                  type="number" 
                  v-model="formData.confirmationCode" 
                  :disabled="loading" 
                  @input="errorMessages = []" 
                  :error="hasErrors" />
                <span v-for="(error, index) in errorMessages" :key="index" style="color: #ff5252;">{{error}}</span>
              </v-form>
            </v-flex>
            <v-btn color="primary" depressed style="text-transform: capitalize" @click.stop="login" :disabled="loading">Login</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout> -->

    <v-btn color="primary" depressed style="text-transform: capitalize" @click.stop="logout">Logout</v-btn>

  </v-container>
</template>

<script>
import firebase from '@/firebase'
import router from '@/router'

export default {
  mounted () {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('confirmButton', {
      size: 'invisible'
    })

    this.$refs.phoneNumber.focus()
  },
  data () {
    return {
      formData: {
        phoneNumber: null,
        confirmationCode: null
      },
      loading: false,
      errorMessages: [],
      confirmationResult: null
    }
  },
  computed: {
    hasErrors () {
      return this.errorMessages.length > 0
    }
  },
  methods: {
    async confirm () {
      try {
        this.loading = true
        let confirmationResult = await firebase.auth().signInWithPhoneNumber(this.formData.phoneNumber, window.recaptchaVerifier)
        // SMS sent. Prompt user to type the code from the message.
        this.confirmationResult = confirmationResult
        this.loading = false
      } catch (error) {
        // Error SMS not sent
        this.errorMessages.push(error.message)
        this.loading = false
      }
    },
    async login () {
      try {
        this.loading = true
        // Sign the user in.
        let result = await this.confirmationResult.confirm(this.formData.confirmationCode)
        // User signed in successfully.
        let user = result.user
        // TODO create a new person in the database linking them to a uid
        console.log(user.uid)
        this.loading = false
        router.push(this.$route.query.redirect || '/manager')
      } catch (error) {
        this.loading = false
        this.errorMessages.push(error.message)
      }
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

  .loginField {
    background-color:  rgba(66, 133, 61, 0.1) !important;
  }
</style>
