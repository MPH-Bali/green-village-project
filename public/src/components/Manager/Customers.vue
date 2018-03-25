<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex>
        <v-btn @click="$router.go(-1)" flat>
          <v-icon size="20px" color="blue darken-2">arrow_back</v-icon>
          <span class="ml-1">Back</span>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="customers">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.houseType }}</td>
              <td>{{ props.item.address }}</td>
              <td>{{ props.item.idrPerMonth }}</td>
              <td>{{ props.item.paidUntil }}</td>
              <td>
                <v-btn ghost :href="customerURL(props.item)">
                  View
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
    customerURL (person) {
      return `/manager/customers/${person.id}`
    }
  },
  data () {
    return {
      customers: [],
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

        }
      ]
    }
  },
  computed: {

  },
  created () {
    this.customers = this.$firestore.collections.person
  }
}
</script>
