<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-layout row wrap align-center>
        <v-flex sx6>
          <v-btn @click="$router.go(-1)" flat>
             <v-icon size="20px" color="blue darken-2">arrow_back</v-icon>
             <span class="ml-1">Back</span>
           </v-btn>
        </v-flex>
        <v-flex sx6></v-flex>
      </v-layout>
      <v-flex xs12>
        <v-card>
          <v-layout row wrap>
            <v-flex md3 xs12 pa-3>
              <h3 class="mb-3">Customer Name</h3>
              <p class="subheading">
                {{person.name}}
              </p>
            </v-flex>
            <v-flex md3 xs12 pa-3>
              <h3 class="mb-3">Type</h3>
              <p class="subheading">
                {{ houseType }}
              </p>
            </v-flex>
            <v-flex md3 xs12 pa-3>
              <h3 class="mb-3">SMS/Call</h3>
              <p class="subheading">
                {{ person.phone }}
              </p>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md3 xs12 pa-3>
              <h3 class="mb-3">Whatsapp</h3>
              <p class="subheading">
                {{ person.whatsapp }}
              </p>
            </v-flex>
            <v-flex md3 xs12 pa-3>
              <h3 class="mb-3">Email</h3>
              <p class="subheading">
                {{ person.email }}
              </p>
            </v-flex>
            <v-flex md3 xs12 pa-3>
              <h3 class="mb-3">Address</h3>
              <p class="subheading">
                {{ person.address }}
              </p>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md3 xs12 pa-3>
              <h3 class="mb-3">Notes</h3>
              <p class="subheading">
                {{ notes }}
              </p>
            </v-flex>
          </v-layout>
          <v-layout column wrap align-end>
            <v-flex xs12>
              <v-card-actions>
                  <template v-if="!decided">
                    <v-btn
                      @click="decline"
                      color="error"
                      large>Decline</v-btn>
                    <v-btn
                      @click="approve"
                      color="info"
                      large>Approve</v-btn>
                  </template>
                  <v-btn
                    v-if="person.email"
                    v-bind:href="mailto"
                    color="success" large>Send Email</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h3 class="mb-0">Payment History</h3>
          </v-card-title>
          <v-layout pa-2 row align-center>
            <v-flex sm9>
              <v-layout row align-center>
                <v-flex sm3>
                  <v-dialog
                    ref="timestampModal"
                    persistent
                    v-model="timestampModal"
                    lazy
                    full-width
                    width="290px"
                    :return-value.sync="form.timestamp">
                    <v-text-field
                      slot="activator"
                      v-model="form.timestamp"
                      prepend-icon="event"
                      readonly
                      class="accent" solo flat
                      label="Date Time" />
                    <v-date-picker v-model="form.timestamp">
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="timestampModal = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.timestampModal.save(form.timestamp)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                <v-flex sm3>
                  <v-text-field
                    type="number"
                    class="accent" solo flat
                    v-model="form.monthlyFee"
                    flat label="Monthly Fee" />
                </v-flex>
                <v-flex sm3>
                  <v-text-field
                    type="number"
                    v-model="form.totalPaid"
                    class="accent" solo flat
                    label="Total Paid" />
                </v-flex>
                <v-flex sm3>
                  <v-dialog
                    ref="paidUntilDialog"
                    persistent
                    v-model="paidUntilModal"
                    lazy
                    full-width
                    width="290px"
                    :return-value.sync="form.paidUntil">
                    <v-text-field
                      slot="activator"
                      v-model="form.paidUntil"
                      prepend-icon="event"
                      readonly
                      class="accent" solo flat
                      label="Paid Until"></v-text-field>
                    <v-date-picker v-model="form.paidUntil">
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="paidUntilModal = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.paidUntilDialog.save(form.paidUntil)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex sm3 row align-center>
              <v-btn
                :disabled="submitting || !valid"
                :loading="submitting"
                @click="addFee"
                large block color="success">Collect Fee</v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="$firestore.fees"
            hide-actions>
            <template slot="items" slot-scope="props">
              <td class="text-xs-center">{{ $moment(props.item.timestamp).format('DD/MM/YYYY') }}</td>
              <td class="text-xs-center">{{ props.item.monthlyFee }}</td>
              <td class="text-xs-center">{{ props.item.totalPaid }}</td>
              <td class="text-xs-center">{{ $moment(props.item.paidUntil).format('DD/MM/YYYY') }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'CustomerDetailView',
  created () {
    this.$firestore.get('person', this.$route.params.id)
      .then((data) => {
        this.person = data
      })
    this.$firestore.syncFees(this.$route.params.id)
  },
  methods: {
    approve (e) {
      this.person.approved = true

      this.$firestore.update('person', this.person)
    },
    decline (e) {
      this.person.declined = true
      this.$firestore.update('person', this.person)
    },
    addFee (e) {
      e.preventDefault()

      if (this.submitting) {
        return
      }

      this.submitting = true

      const fee = this.form

      this.$firestore.add('fee', {
        ...fee,
        personId: this.$route.params.id
      }).then(() => {
        this.$firestore.update('person', {
          ...this.person,
          lastFeePaid: fee
        }).then(() => {
          this.submitting = false
          this.form = {}
          this.$emit('message', 'Fee added', 'success')
        })
      })
    }
  },
  computed: {
    mailto () {
      return `mailto:${this.person.email}`
    },
    valid () {
      const { timestamp, monthlyFee, paidUntil, totalPaid } = this.form
      return timestamp && monthlyFee && paidUntil && totalPaid
    },
    decided () {
      const { approved, declined } = this.person
      return approved || declined
    },
    houseType: function () {
      return this.person.houseType ? this.person.houseType.name : 'n/a'
    },
    notes: function () {
      return this.person.notes ? this.person.notes : '-'
    }
  },
  data () {
    return {
      paidUntilModal: false,
      timestampModal: false,
      submitting: false,
      form: {},
      person: {},
      headers: [
        { text: 'Date Time', value: 'timestamp', align: 'center' },
        { text: 'Monthly Fee', value: 'monthlyFee', align: 'center' },
        { text: 'Total Paid', value: 'totalPaid', align: 'center' },
        { text: 'Paid Until', value: 'paidUntil', align: 'center' }
      ],
      items: []
    }
  }
}
</script>
