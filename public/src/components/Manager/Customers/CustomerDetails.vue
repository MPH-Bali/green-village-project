<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-btn @click="$router.go(-1)" flat>
          <v-icon size="20px" color="blue darken-2">arrow_back</v-icon>
          <span class="ml-1">{{ $t('common.back') }}</span>
        </v-btn>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-layout row wrap>
          <v-flex md3 xs12 pa-3>
            <h3 class="mb-3">{{ $t('models.customers.name') }}</h3>
            <p class="subheading">{{ person.name }}</p>
          </v-flex>
          <v-flex md3 xs12 pa-3>
            <h3 class="mb-3">{{ $t('models.customers.houseType') }}</h3>
            <p class="subheading">{{ person.houseType }}</p>
          </v-flex>
          <v-flex md3 xs12 pa-3>
            <h3 class="mb-3">{{ $t('models.customers.phone') }}</h3>
            <p class="subheading">{{ person.phone }}</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex md3 xs12 pa-3>
            <h3 class="mb-3">{{ $t('models.customers.whatsapp') }}</h3>
            <p class="subheading">{{ person.whatsapp }}</p>
          </v-flex>
          <v-flex md3 xs12 pa-3>
            <h3 class="mb-3">{{ $t('models.customers.email') }}</h3>
            <p class="subheading">{{ person.email }}</p>
          </v-flex>
          <v-flex md3 xs12 pa-3>
            <h3 class="mb-3">{{ $t('models.customers.address') }}</h3>
            <p class="subheading">{{ person.address }}</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex md3 xs12 pa-3>
            <h3 class="mb-3">{{ $t('models.customers.notes') }}</h3>
            <p class="subheading">{{ person.notes || '-' }}</p>
          </v-flex>
        </v-layout>
        <v-layout column wrap align-end>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                v-if="!decided"
                @click="decline"
                color="error"
                depressed>
              {{ $t('forms.decline') }}
              </v-btn>
              <v-btn
                v-if="!decided"
                @click="approve"
                color="info"
                depressed>
                {{ $t('forms.approve') }}
              </v-btn>
              <v-btn
                v-if="person.email"
                :href="`mailto:${person.email}`"
                color="success"
                depressed>
                {{ $t('forms.sendEmail') }}
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>

    <v-flex xs12>
      <fees-form :id="id" />
    </v-flex>

    <v-flex xs12>
      <fees-table :id="id" />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    id: { type: String, reqired: true }
  },
  created () {
    this.$sync({
      customerDetails: this.$db.collection('person').doc(this.id),
      customerFees: this.$db.collection('fee').where('personId', '==', this.id)
    })
  },
  beforeDestroy () {
    this.$store.customerDetails.unsubscribe()
    this.$store.customerFees.unsubscribe()
  },
  methods: {
    approve () {
      this.$store.customerDetails.ref.update({ approved: true })
    },
    decline () {
      this.$store.customerDetails.ref.update({ declined: true })
    }
  },
  computed: {
    person () {
      this.$store.customerDetails.data
    },
    decided () {
      const { approved, declined } = this.person
      return approved || declined
    }
  }
}
</script>
