<template>
  <v-container grid-list-lg>
    <navigation-header>
      <template slot="right">
        <v-btn class="hidden-xs-only"
          depressed color="primary"
          @click="$router.push('/manager/customers/form')">
          Add Customer
        </v-btn>
        <v-btn icon class="hidden-sm-and-up mt-0"
          @click="$router.push('/manager/customers/form')">
          <v-icon color="primary">add</v-icon>
        </v-btn>
      </template>
    </navigation-header>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            {{ $t('routeNames.customers') }}
            <v-spacer />
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search" />
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
              <td>{{ props.item.lastFeePaid.monthlyFee }}</td>
              <td>{{ props.item.lastFeePaid.paidUntil }}</td>
              <td>
                <v-btn flat :href="`/manager/customers/${props.item.id}`">
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
export default {
  name: 'Customers',
  methods: {
    customFilter (items, search, filter) {
      return items.filter((row) => {
        return filter(row['name'], search) ||
          filter(row['type'], search) ||
          filter(row['address'], search) ||
          filter(row.lastFeePaid.monthlyFee, search) ||
          filter(row.lastFeePaid.paidUntil, search)
      })
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
      return this.$store.customers.data
        .map((customer) => ({
          ...customer,
          type: (customer.houseType && customer.houseType.name) || '',
          lastFeePaid: {
            paidUntil: (customer.lastFeePaid && customer.lastFeePaid.paidUntil) || '-',
            monthlyFee: (customer.lastFeePaid && customer.lastFeePaid.monthlyFee) || '-'
          }
        }))
    }
  }
}
</script>
