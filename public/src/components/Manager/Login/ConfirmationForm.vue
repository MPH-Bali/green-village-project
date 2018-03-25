<template>
  <v-layout column text-xs-center>
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
            <v-flex ml-0 mt-3 pl-0 text-xs-right>
              <a class="resendCode" @click.stop="$emit('onResend')" >Resend Code</a>
            </v-flex>            
            <v-flex px-0 mt-3>
              <v-btn id="confirmButton" color="primary" depressed style="text-transform: uppercase" @click.stop="login" :loading="loading" block>Login</v-btn>
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
        let result = await this.confirmationResult.confirm(this.confirmationCode.join(''))
        // User signed in successfully.
        let user = result.user
        if (!await this.$firestore.getUserByUid(user.uid)) {
          // Create a new person in the database linking them to a uid
          await this.createPerson(user)
        }

        this.loading = false
      } catch (error) {
        this.loading = false
        this.errorMessages.push(error.message)
      }
    },
    async createPerson (user) {
      await this.$firestore.save('person', {
        login: user.uid,
        name: '',
        phone: user.phoneNumber,
        address: '',
        email: '',
        geolocation: {
          latitude: '',
          longitude: ''
        },
        type: {
          employee: true,
          client: false
        },
        role: {
          communityManager: true,
          facilityManager: false,
          superAdmin: false
        },
        houseType: {
          id: '',
          name: ''
        },
        approved: false
      })
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

  .resendCode {
    font-size: 16px;
    font-weight: 600;    
    text-decoration: underline;
  }
</style>

