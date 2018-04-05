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
            <transition name="slide-buyer-form">
            <v-layout row wrap v-if="!getPending">
              <v-flex xs12 sm6>
                <p class="body-2 mb-1">{{ $t("common.Name") }}</p>
                <v-text-field v-model="form.name"
                              :error-messages="nameErrors"
                              flat
                              @input="$v.form.name.$touch()"
                              @blur="$v.form.name.$touch()"/>
              </v-flex>
              <v-flex xs12 sm6>
                <p class="body-2 mb-1">{{ $t("common.Company") }}</p>
                <v-text-field flat
                              v-model="form.company"/>
              </v-flex>

              <v-flex xs12 sm6>
                <p class="body-2 mb-1">{{ $t("common.Email") }}</p>
                <v-text-field v-model="form.email"
                              :error-messages="emailErrors"
                              flat
                              @input="$v.form.email.$touch()"
                              @blur="$v.form.email.$touch()"/>
              </v-flex>
              <v-flex sm6>
              </v-flex>

              <v-flex xs12 sm6>
                <p class="body-2 mb-1">{{ $t("common.PhoneNumber") }}</p>
                <v-text-field v-model="form.phone"
                              :error-messages="phoneErrors"
                              flat
                              @input="$v.form.phone.$touch()"
                              @blur="$v.form.phone.$touch()"/>
              </v-flex>
              <v-flex xs12 sm6>
                <p class="body-2 mb-1">{{ $t("common.Whatsapp") }}</p>
                <v-text-field flat
                              v-model="form.whatsapp" />
              </v-flex>

              <v-flex xs12>
                <p class="body-2 mb-1">{{ $t("common.Notes") }}</p>
                <v-text-field name="input-1"
                              v-model="form.notes"
                              flat
                              multi-line>
                </v-text-field>
              </v-flex>

              <v-flex xs6 text-xs-left>
                <v-btn color="error"
                       outline
                       depressed
                      @click.stop="$router.go(-1)">{{ $t("common.Cancel") }}
                </v-btn>
              </v-flex>
              <v-flex xs6 text-xs-right>
                <v-btn style="text-transform: capitalize"
                       depressed color="primary"
                      :disabled="savePending"
                      @click.stop="save"
                      :loading="savePending">{{ this.id ? $t('common.Save') : $t('common.Add') }}
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
import { required, email } from 'vuelidate/lib/validators'

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
      form: {}
    }
  },
  validations: {
    form: {
      name: { required },
      email: { email },
      phone: { required }
    }
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.form.name.$dirty) return errors
      !this.$v.form.name.required && errors.push('Name is required')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.form.email.$dirty) return errors
      !this.$v.form.email.email && errors.push('Invalid e-mail')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.form.phone.$dirty) return errors
      !this.$v.form.phone.required && errors.push('Phone number is required')
      return errors
    }
  },
  async created () {
    if (this.id) {
      this.getPending = true
      this.form = await this.$store.buyers.collection.get(this.id)
      this.getPending = false
    }
  },
  methods: {
    async save () {
      this.$v.$touch()
      if (this.$v.$invalid) return
      if (!this.id) this.form.type = {}
      this.form.type.buyer = true
      this.savePending = true
      await this.$store.buyers.collection.save(this.form)
      this.$emit('message', {
        text: 'Buyer saved',
        type: 'success',
        ding: true
      })
      this.savePending = false
      this.$router.go(-1)
    }
  }
}
</script>

<style>
  .slide-buyer-form-enter-active, .slide-buyer-form-leave-active {
    max-height: 1000px;
    transition: max-height .5s, opacity .5s;
  }
  .slide-buyer-form-enter, .slide-buyer-form-leave-to {
    opacity: 0;
    max-height: 82px;
  }
</style>
