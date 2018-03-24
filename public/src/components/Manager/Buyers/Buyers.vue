<template>
  <v-container grid-list-lg>
    <v-card class="mt-4">
      <v-card-title>
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-flex text-xs-right
          <v-btn depressed color="primary" @click.stop="$router.push({ name: 'buyer-edit' })">
            <v-icon>add_circle</v-icon>
            <span style="text-transform: capitalize" class="ml-2">Add</span>
          </v-btn>
        </v-flex>    
      </v-card-title>

      <v-data-table
        :loading="$firestore.collectionsPending.person"
        :headers="headers"
        :items="buyersList"
        :search="search"
        :light="true"
        no-data-text="No data"
        no-results-text="No buyers found"
        hide-actions class="buyers-table"
        pagination.sync="pagination">
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.company }}</td>
          <td class="text-xs-center">{{ props.item.sales.length }}</td>
          <td class="text-xs-center">{{ props.item.lastPurchase }}</td>
          <td class="text-xs-center">
            <v-btn icon @click="$router.push({ name: 'buyer-info', params: { id: props.item.id }})">
              <v-icon size="17px" color="primary">fa-search</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>

      <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
      </div>
      
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      pagination: {},
      headers: [
        { text: 'Name', align: 'center', sortable: true, value: 'name' },
        { text: 'Company', align: 'center', sortable: true, value: 'company' },
        { text: 'No. of Sales', align: 'center', sortable: true, value: 'sales.length' },
        { text: 'Last Purchase', align: 'center', sortable: true, value: 'lastPurchase' },
        { text: '', sortable: false, align: 'center', value: null }
      ]
    }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null) return 0
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
    sales () {
      // return this.$firestore.collections.sales
      //  test data
      return [
        {
          buyer: {
            id: '6yW9uHBgM3X9T7Qhgm1E',
            name: 'Michael'
          },
          materials: [
            {
              material: {
                id: 'Tu4SFfDhBUgAwGsvfopc',
                name: 'plastic'
              },
              kilo: 200,
              pricePerKilo: 20000
            }
          ]
        },
        {
          buyer: {
            id: '7TOr2Qzwi8tnHKfHNjwB',
            name: 'Michael'
          },
          materials: [
            {
              material: {
                id: 'Tu4SFfDhBUgAwGsvfopc',
                name: 'plastic'
              },
              kilo: 200,
              pricePerKilo: 20000
            }
          ]
        },
        {
          buyer: {
            id: '6yW9uHBgM3X9T7Qhgm1E',
            name: 'Michael'
          },
          materials: [
            {
              material: {
                id: 'Tu4SFfDhBUgAwGsvfopc',
                name: 'plastic'
              },
              kilo: 200,
              pricePerKilo: 20000
            }
          ]
        },
        {
          buyer: {
            id: '6yW9uHBgM3X9T7Qhgm1E',
            name: 'Michael'
          },
          materials: [
            {
              material: {
                id: 'Tu4SFfDhBUgAwGsvfopc',
                name: 'plastic'
              },
              kilo: 200,
              pricePerKilo: 20000
            }
          ]
        }
      ]
    },
    salesByBuyers () {
      return this.sales.reduce((result, sale) => {
        if (!result[sale.buyer.id]) result[sale.buyer.id] = []
        result[sale.buyer.id].push(sale)
        return result
      }, {})
    },
    buyers () {
      return this.$firestore.collections.person.filter(person => {
        return person.type && person.type.buyer
      })
    },
    buyersList () {
      return this.buyers.map(buyer => {
        buyer.sales = this.salesByBuyers[buyer.id] || []
        return buyer
      })
    }
  }
}
</script>

<style>
  .buyers-table th {
    background: #e5ece9;
  }
</style>
