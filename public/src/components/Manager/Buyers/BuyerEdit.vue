<template>
  <v-layout row >
    <v-flex xs12 md8 offset-md2>
      <v-card class="mt-4">
        <v-flex xs12>
          <v-container fluid grid-list-lg class="buyers-container">
            <v-flex xs12 text-xs-center>
              <v-progress-circular 
                indeterminate 
                :size="50" 
                v-show="getPending"
                color="primary"/>          
            </v-flex>
            <transition name="slide-buyer-edit">
            <v-layout row wrap v-if="!getPending">
              <v-flex xs6>
                <p class="body-2 mb-1">Name</p>
                <v-text-field v-model="formData.name" 
                              :error-messages="nameErrors"
                              flat
                              @input="$v.formData.name.$touch()"
                              @blur="$v.formData.name.$touch()"/>
              </v-flex>
              <v-flex xs6>
                <p class="body-2 mb-1">Company</p>
                <v-text-field flat 
                              v-model="formData.company"/>
              </v-flex>
              
              <v-flex xs6>
                <p class="body-2 mb-1">E-mail</p>
                <v-text-field v-model="formData.email" 
                              :error-messages="emailErrors"
                              flat 
                              @input="$v.formData.email.$touch()"
                              @blur="$v.formData.email.$touch()"/>
              </v-flex>
              <v-flex xs6>
              </v-flex>

              <v-flex xs6>
                <p class="body-2 mb-1">Phone</p>
                <v-text-field v-model="formData.phone"
                              :error-messages="phoneErrors"
                              flat 
                              @input="$v.formData.phone.$touch()"
                              @blur="$v.formData.phone.$touch()"/>
              </v-flex>
              <v-flex xs6>
                <p class="body-2 mb-1">Whatsapp</p>
                <v-text-field flat 
                              v-model="formData.whatsapp" />
              </v-flex>

              <v-flex xs12>
                <p class="body-2 mb-1">Notes</p>
                <v-text-field name="input-1"
                              v-model="formData.notes"
                              flat 
                              multi-line>
                </v-text-field>            
              </v-flex>

              <v-flex xs6 text-xs-left>
                <v-btn color="error" 
                       outline
                       depressed 
                      @click.stop="$router.go(-1)">Cancel
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
            </transition>
          </v-container>
        </v-flex>
      </v-card>
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
      this.$router.go(-1)
    }
  }
}
</script>

<style>
  .slide-buyer-edit-enter-active, .slide-buyer-edit-leave-active {
    max-height: 1000px;
    transition: max-height .5s, opacity .5s;
  }
  .slide-buyer-edit-enter, .slide-buyer-edit-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    max-height: 82px;
  }
</style>
