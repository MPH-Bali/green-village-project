<template>
  <v-layout column text-xs-center>
    <v-card class="py-5 my-5">
      <v-card-text class="py-5 my-5">
        <p class="title" style="text-transform: uppercase;">
          Please enter the code we sent you via sms
        </p>
        <v-flex md4 offset-md4>
          <v-form @submit.prevent>
            <v-flex ml-0 mt-3 pl-0 text-xs-left>
              <label class="loginLabel">Code</label>
            </v-flex>
            <v-layout rows>
              <input
                v-for="(character, index) in confirmationCode"
                :key="index"
                autocomplete="off"
                class="confirmationField"              
                name="confirmationCode"
                type="tel"
                maxlength="1"
                v-model="confirmationCode[index]" 
                :disabled="loading" 
                @input="event => confirmationCodeInput(event, index)"
                @keyup.enter="login"
                @keyup.delete.left="moveLeft"
                @keyup.right="moveRight"
                :error="hasErrors" />
            </v-layout>
            <p class="errorMessage" v-for="(error, index) in errorMessages" :key="index" style="color: #ff5252;">{{error}}</p>
            <v-flex ml-0 mt-3 pl-0 text-xs-right>
              <a class="resendCode" @click.stop="$emit('onResend')" >Resend Code</a>
            </v-flex>            
            <v-flex px-0 mt-3>
              <v-btn 
                color="primary" 
                depressed 
                style="text-transform: uppercase" 
                @click.stop="login" 
                :loading="loading" 
                block>
                Login
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
        await this.confirmationResult.confirm(this.confirmationCode.join(''))
        this.loading = false
        this.$router.push('/manager')
      } catch (error) {
        this.loading = false
        this.errorMessages = []
        this.errorMessages.push(error.message)
      }
    },
    confirmationCodeInput (event, index) {
      // On input select the next input control in the componenet.
      this.errorMessages = []
      if (!isNaN(parseInt(event.data, 10))) {
        this.confirmationCode[index] = event.data

        // Input is a number, focus on next input.
        if (event.srcElement.nextSibling) {
          event.srcElement.nextSibling.select()
        }
      } else {
        // Input is not a number, reset the input value.
        this.confirmationCode[index] = null
      }
    },
    moveLeft () {
      if (event.srcElement.previousSibling) {
        event.srcElement.previousSibling.select()
      }
    },
    moveRight () {
      if (event.srcElement.nextSibling) {
        event.srcElement.nextSibling.select()
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

  .confirmationField {
    border-bottom: 1px solid black;
    margin: 0 10px;
    flex: 1;
    width: 100%;
    font-size: 30px;
    text-align: center;
    margin-top: 10px;      
  }

  input.confirmationField:focus {
    outline: none;
    border-bottom: 2px solid #42853d;
  }

  .errorMessage {
    margin-top: 10px;
  }

  .resendCode {
    font-size: 16px;
    font-weight: 600;    
    text-decoration: underline;
  }
</style>

