<template>
  <v-container grid-list-lg>
    <navigation-header />

    <v-layout>
      <v-flex>
        <v-card>
          <v-layout row wrap pa-3>
            <v-flex xs12 sm12 md6>
              <h3 class="pb-3">Customer Name</h3>
              <v-text-field
                class="accent" solo flat
                label="Customer Name"
                type="text"
                v-model="form.name" />
            </v-flex>
            <v-flex xs12 sm12 md6>
              <h3 class="pb-3">Email</h3>
              <v-text-field
                class="accent" solo flat
                label="Email"
                type="text"
                v-model="form.email" />
            </v-flex>
            <v-flex xs12 sm12 md6>
              <h3 class="pb-3">Type</h3>
              <v-select
                :items="houseTypes"
                clearable
                class="accent" solo flat
                label="Type"
                v-model="form.houseType" />
            </v-flex>
            <v-flex xs12 sm12 md6>
              <h3 class="pb-3">Company</h3>
              <v-text-field
                :disabled="companyDisabled"
                class="accent" solo flat
                label="Company"
                type="text"
                v-model="form.company" />
            </v-flex>
            <v-flex xs12 sm12 md6>
              <h3 class="pb-3">SMS/Call</h3>
              <v-text-field
                class="accent" solo flat
                label="SMS/Call"
                type="text"
                v-model="form.phone" />
            </v-flex>
            <v-flex xs12 sm12 md6>
              <h3 class="pb-3">Whatsapp</h3>
              <v-text-field
                class="accent" solo flat
                label="Whatsapp"
                type="text"
                v-model="form.whatsapp" />
            </v-flex>
            <v-flex sm12 md12>
              <h3 class="pb-3">Address</h3>
              <v-text-field
                class="accent" solo flat
                label="Address"
                type="text"
                multi-line
                v-model="form.address" />
            </v-flex>
            <v-flex sm12 md12>
              <h3 class="pb-3">Notes</h3>
              <v-text-field
                class="accent" solo flat
                label="Notes"
                type="text"
                multi-line
                v-model="form.notes" />
            </v-flex>
            <v-flex md2>
              <v-btn
              large block outline
              :disabled="submitting"
              color="error">Cancel</v-btn>
            </v-flex>
            <v-spacer />
            <v-flex md2>
              <v-btn
                @click="submit"
                :loading="submitting"
                :disabled="submitting || !valid"
                large block
                color="success">Save</v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import NavigationHeader from '@/elements/NavigationHeader'

export default {
  name: 'NewCustomer',
  components: {
    NavigationHeader
  },
  methods: {
    submit () {
      if (!this.valid) {
        return
      }

      this.submitting = true

      this.$firestore.add('person', this.form)
        .then((ref) => {
          this.form = {}
          this.submitting = false
          this.$router.push(`/manager/customers/${ref.id}`)
        })
    }
  },
  computed: {
    companyDisabled () {
      return this.form.houseType !== 'business'
    },
    houseTypes () {
      return this.settings.houseTypes || []
    },
    settings () {
      const settings = this.$firestore.collections.settings

      return settings[0] || {}
    },
    valid () {
      const { name, email, phone, address, houseType } = this.form

      return name && email && phone && address && houseType
    }
  },
  data () {
    return {
      submitting: false,
      form: {}
    }
  },
  created () {

  }
}
</script>
