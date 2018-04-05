<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="mb-0">
        {{ $t('headers.paymentHistory') }}
      </h3>
    </v-card-title>
    <v-layout pa-2 row align-center>
      <v-flex sm9>
        <v-layout row align-center>
          <v-flex sm3>
            <date-picker-modal @ok="date => form.timestamp = $date">
              <v-text-field
                slot="activator"
                :label="$t('models.fees.timestamp')"
                v-model="form.timestamp"
                readonly solo flat
                prepend-icon="event"
                class="accent" />
            </date-picker-modal>
          </v-flex>
          <v-flex sm3>
            <v-text-field
              type="number"
              class="accent" solo flat
              v-model="form.monthlyFee"
              :label="$t('models.fees.monthlyFee')" />
          </v-flex>
          <v-flex sm3>
            <v-text-field
              type="number"
              v-model="form.totalPaid"
              class="accent" solo flat
              :label="$t('models.fees.totalPaid')" />
          </v-flex>
          <v-flex sm3>
            <date-picker-modal @ok="date => form.paidUntil = date">
              <v-text-field
                slot="activator"
                :label="$t('models.fees.paidUntil')"
                v-model="form.paidUntil"
                readonly solo flat
                prepend-icon="event"
                class="accent" />
            </date-picker-modal>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex sm3 row align-center>
        <v-btn
          :disabled="submitting || !valid"
          :loading="submitting"
          @click.stop="addFee"
          large block color="success">
          {{ $t('forms.collectFee') }}
        </v-btn>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    id: { type: String, reqired: true }
  },
  data () {
    return {
      submitting: false,
      form: { personId: this.id }
    }
  },
  computed: {
    valid () {
      const { timestamp, monthlyFee, paidUntil, totalPaid } = this.form
      return timestamp && monthlyFee && paidUntil && totalPaid
    }
  },
  methods: {
    async addFee () {
      this.submitting = true

      const lastFeePaid = await this.$store.customerFees.ref.add(this.form)
      await this.$store.customerDetail.ref.update({ lastFeePaid })

      this.submitting = false
      this.form = { personId: this.id }

      this.$emit('message', {
        text: this.$t('toasts.feeAdded'),
        type: 'success',
        ding: true
      })
    }
  }
}
</script>
