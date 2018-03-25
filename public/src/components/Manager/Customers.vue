<template>
  <v-container grid-list-lg>
    <navigation-header>
      <template slot="right">
        <v-btn
          block large color="success"
          @click="goToNewCustomerForm">
          Add Customer
        </v-btn>
      </template>
    </navigation-header>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-card-title>
            {{ $t('routeNames.customers') }}
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :custom-filter="customFilter"
            :search="search"
            :headers="headers"
            :items="customers">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.type }}</td>
              <td>{{ props.item.address }}</td>
              <td>{{ props.item.idrPerMonth }}</td>
              <td>{{ props.item.lastFeePaid.paidUntil }}</td>
              <td>
                <v-btn flat :href="customerURL(props.item)">
                  <v-icon color="">chevron_right</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import NavigationHeader from '@/elements/NavigationHeader'

export default {
  name: 'Customers',
  components: {
    NavigationHeader
  },
  methods: {
    customFilter (items, search, filter) {
      return items.filter((row) => {
        return filter(row['name'], search) ||
          filter(row['type'], search) ||
          filter(row['address'], search) ||
          filter(row['idr'], search)
      })
    },
    customerURL (person) {
      return `/manager/customers/${person.id}`
    },
    goToNewCustomerForm () {
      this.$router.push('/manager/customers/new')
    }
  },
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Full Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Type',
          align: 'left',
          sortable: true,
          value: 'type'
        },
        {
          text: 'Address',
          align: 'left',
          sortable: true,
          value: 'address'
        },
        {
          text: 'IDR/Month',
          align: 'left',
          sortable: true,
          value: 'idr'
        },
        {
          text: 'Paid Until',
          align: 'left',
          sortable: true,
          value: 'paidUntil'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        }
      ]
    }
  },
  computed: {
    customers () {
      return this.$firestore.collections.person.map((customer) => {
        return {
          ...customer,
          type: customer.houseType ? customer.houseType.name : '',
          lastFeePaid: {
            timestamp: new Date(),
            monthlyFee: 100000,
            feePaid: 100000,
            paidUntil: new Date() + (60 * 60 * 24 * 30)
          }
        }
      })
    }
  },
  created () {

  }
}
</script>
