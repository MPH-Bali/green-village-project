<template>
  <v-layout row>
    <v-flex xs12 md8 offset-md2>
      <v-container fluid grid-list-lg>
        <v-flex xs12 text-xs-center>
          <v-progress-circular 
            indeterminate 
            :size="50" 
            v-show="getPending"
            color="primary"/>          
        </v-flex>
        <v-layout row wrap v-if="!getPending">
          <v-flex xs6>
            <v-text-field label="Name"
                          v-model="formData.name" 
                          :error-messages="nameErrors"
                          @input="$v.formData.name.$touch()"
                          @blur="$v.formData.name.$touch()"/>
          </v-flex>
          <v-flex xs6>
            <v-text-field label="Company" 
                           v-model="formData.company"/>
          </v-flex>
          

          <v-flex xs6>
            <v-text-field label="E-mail" 
                          v-model="formData.email" 
                          :error-messages="emailErrors"
                          @input="$v.formData.email.$touch()"
                          @blur="$v.formData.email.$touch()"/>
          </v-flex>
          <v-flex xs6>
          </v-flex>

          <v-flex xs6>
            <v-text-field label="SMS/Call" 
                          v-model="formData.phone"
                          :error-messages="phoneErrors"
                          @input="$v.formData.phone.$touch()"
                          @blur="$v.formData.phone.$touch()"/>
          </v-flex>
          <v-flex xs6>
            <v-text-field label="Whatsapp" 
                          v-model="formData.whatsapp" />
          </v-flex>

          <v-flex xs6 text-xs-left>
            <v-btn color="error" 
                   outline
                   depressed 
                  @click.stop="$router.push({ name: 'buyers' })">Cancel
            </v-btn>
          </v-flex>
          <v-flex xs6 text-xs-right>
            <v-btn style="text-transform: capitalize" 
                   depressed color="primary" 
                  @click.stop="save" 
                  :loading="savePending">{{ this.id ? 'Save' : 'Add' }}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, numeric } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  props: {
    id: {
      type: String,
      reqired: false
    }
  },
  data () {
    return {
      getPending: false,
      deletePending: false,
      savePending: false,
      addPending: false,
      formData: {}
    }
  },
  validations: {
    formData: {
      name: { required },
      email: { email },
      phone: { required, numeric }
    }
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.formData.name.$dirty) return errors
      !this.$v.formData.name.required && errors.push('Name is required')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.formData.email.$dirty) return errors
      !this.$v.formData.email.email && errors.push('Invalid e-mail')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.formData.phone.$dirty) return errors
      !this.$v.formData.phone.required && errors.push('Phone number is required')
      !this.$v.formData.phone.numeric && errors.push('Invalid phone number')
      return errors
    }
  },
  created () {
    if (this.id) this.fetchBuyer(this.id)
  },
  methods: {
    async fetchBuyer (id) {
      this.getPending = true
      const result = await this.$firestore.get('person', id)
      this.getPending = false
      this.formData = result
    },
    async save () {
      this.$v.$touch()
      if (this.$v.$invalid) return
      if (!this.id) this.formData.type = {}
      this.formData.type.buyer = true
      this.savePending = true
      await this.$firestore.save('person', this.formData)
      this.savePending = false
      this.$router.push({ name: 'buyers' })
    }
  }
}
</script>
