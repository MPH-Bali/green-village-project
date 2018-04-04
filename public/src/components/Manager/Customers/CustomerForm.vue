<template>
  <v-container grid-list-lg>
    <navigation-header />

    <v-layout>
      <v-flex>
        <v-card>
          <v-layout row wrap pa-3>
            <v-flex xs12 sm12 md6>
              <h3 class="pb-3">{{ $t('models.customers.name') }}</h3>
              <v-text-field
                class="accent" solo flat
                :label="$t('models.customers.name')"
                type="text"
                v-model="form.name" />
            </v-flex>
            <v-flex xs12 sm12 md6>
              <h3 class="pb-3">{{ $t('models.customers.email') }}</h3>
              <v-text-field
                type="email"
                class="accent" solo flat
                :label="$t('models.customers.email')"
                v-model="form.email" />
            </v-flex>
            <v-flex xs12 sm12 md6>
              <h3 class="pb-3">{{ $t('models.customers.houseType') }}</h3>
              <v-select
                :items="houseTypes"
                clearable
                class="accent" solo flat
                :label="$t('models.customers.houseType')"
                v-model="form.houseType" />
            </v-flex>
            <v-flex xs12 sm12 md6>
              <h3 class="pb-3">{{ $t('models.customers.company') }}</h3>
              <v-text-field
                :disabled="companyDisabled"
                class="accent" solo flat
                :label="$t('models.customers.company')"
                type="text"
                v-model="form.company" />
            </v-flex>
            <v-flex xs12 sm12 md6>
              <h3 class="pb-3">{{ $t('models.customers.phone') }}</h3>
              <v-text-field
                class="accent" solo flat
                :label="$t('models.customers.phone')"
                type="text"
                v-model="form.phone" />
            </v-flex>
            <v-flex xs12 sm12 md6>
              <h3 class="pb-3">{{ $t('models.customers.whatsapp') }}</h3>
              <v-text-field
                class="accent" solo flat
                :label="$t('models.customers.whatsapp')"
                type="text"
                v-model="form.whatsapp" />
            </v-flex>
            <v-flex sm12 md12>
              <h3 class="pb-3">{{ $t('models.customers.address') }}</h3>
              <v-text-field
                class="accent" solo flat
                :label="$t('models.customers.address')"
                type="text"
                multi-line
                v-model="form.address" />
            </v-flex>
            <v-flex sm12 md12>
              <h3 class="pb-3">{{ $t('models.customers.notes') }}</h3>
              <v-text-field
                class="accent" solo flat
                :label="$t('models.customers.notes')"
                type="text"
                multi-line
                v-model="form.notes" />
            </v-flex>
            <v-flex md2>
              <v-btn
              large block outline
              :disabled="submitting"
              color="error">{{ $t('forms.cancel') }}</v-btn>
            </v-flex>
            <v-spacer />
            <v-flex md2>
              <v-btn
                @click="submit"
                :loading="submitting"
                :disabled="submitting || !valid"
                large block
                color="success">{{ $t('forms.save') }}</v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'CustomerForm',
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
      return (this.settings.houseTypes || []).map((type) => {
        return {
          text: this.$t(`houseTypes.${type}`),
          value: type
        }
      })
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
      form: {
        type: { customer: true }
      }
    }
  }
}
</script>
