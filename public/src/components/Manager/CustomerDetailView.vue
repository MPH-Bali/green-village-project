<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
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
                {{ person.household }}
              </p>
            </v-flex>
            <v-flex md3 xs12 pa-3>
              <h3 class="mb-3">Company</h3>
              <p class="subheading">
                {{ person.company }}
              </p>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md3 xs12 pa-3>
              <h3 class="mb-3">SMS/Call</h3>
              <p class="subheading">
                {{ person.phone }}
              </p>
            </v-flex>
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
          </v-layout>
          <v-layout row wrap>
            <v-flex md3 xs12 pa-3>
              <h3 class="mb-3">Address</h3>
              <p class="subheading">
                {{ person.address }}
              </p>
            </v-flex>
            <v-flex md3 xs12 pa-3>
              <h3 class="mb-3">Notes</h3>
              <p class="subheading">
                -
              </p>
            </v-flex>
          </v-layout>
          <v-layout column wrap align-end>
            <v-flex xs12>
              <v-card-actions>
                  <v-btn color="error" large>Decline</v-btn>
                  <v-btn color="info" large>Approve</v-btn>
                  <v-btn color="success" large>Send Email</v-btn>
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
              <td class="text-xs-center">{{ props.item.paidUntil }}</td>
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
  data () {
    return {
      person: {},
      headers: [
        { text: 'Date Time', value: 'timestamp', align: 'center' },
        { text: 'Monthly Fee', value: 'monthlyFee', align: 'center' },
        { text: 'Total Paid', value: 'totalPaid', align: 'center' },
        { text: 'Paid Until', value: 'paidUntil', align: 'center' }
      ],
      items: [
        {
          personId: 'XXcgSBLHHkGb2KrOTJ0y',
          timestamp: new Date(),
          monthlyFee: 50,
          totalPaid: 200,
          paidUntil: '2018-07-24T09:55:48.942Z'
        }
      ]
    }
  }
}
</script>
