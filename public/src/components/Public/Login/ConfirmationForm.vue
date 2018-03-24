<template>
  <v-card class="py-5 my-5">
    <v-card-text class="py-5 my-5">
      <p class="title" style="text-transform: uppercase;">Please enter the code we sent you via sms</p>
      <v-flex md4 offset-md4>
        <v-form>
          <v-flex ml-0 mt-3 pl-0 text-xs-left>
            <label class="loginLabel">Code</label>
          </v-flex>
          <v-layout rows>
            <input
              v-for="(character, index) in confirmationCode"
              :key="index"
              class="confirmationField"              
              name="confirmationCode" 
              type="tel"
              maxlength="1"
              v-model="confirmationCode[index]" 
              :disabled="loading" 
              @input="event => confirmationCodeInput(event, index)"
              :error="hasErrors" />
          </v-layout>
          <span v-for="(error, index) in errorMessages" :key="index" style="color: #ff5252;">{{error}}</span>
          <v-flex px-0 mt-3>
            <v-btn id="confirmButton" color="primary" depressed style="text-transform: capitalize" @click.stop="login" :loading="loading" block>Login</v-btn>
          </v-flex>
        </v-form>
      </v-flex>
    </v-card-text>
  </v-card>   
</template>

<script>
import router from '@/router'

export default {
  props: {
    confirmationResult: Object
  },
  computed: {
    hasErrors () {
      return this.errorMessages.length > 0
    }
  },
  data () {
    return {
      confirmationCode: [null, null, null, null, null, null],
      loading: false,
      errorMessages: []
    }
  },
  methods: {
    async login () {
      try {
        this.loading = true
        // Sign the user in.
        let result = await this.confirmationResult.confirm(this.confirmationCode.join(''))
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
    confirmationCodeInput (event, index) {
      if (!isNaN(parseInt(event.data, 10))) {
        // Input is a number, focus on next input.
        if (event.srcElement.nextSibling) {
          event.srcElement.nextSibling.select()
        }
      } else {
        // Input is not a number, reset the input value.
        this.confirmationCode[index] = null
      }
    }
  }
}
</script>

<style scoped>
  input.confirmationField {
      border-bottom: 1px solid black;
      margin: 0 10px;
      flex: 1;
      width: 100%;
      font-size: 30px;
      text-align: center;
      margin-top: 10px;      
  }
</style>

