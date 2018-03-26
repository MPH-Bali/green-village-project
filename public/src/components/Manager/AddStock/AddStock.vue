<template>
  <v-layout>
    <v-flex xs12 md10 offset-md1 lg8 offset-lg2>
      <v-layout row wrap pt-4>
        <v-layout>
          <v-flex>
            <span class="text-xs-left">
              <v-btn icon class="mr-3" @click="$router.push('/manager/daily-log/')">
                <v-icon size="20px">arrow_back</v-icon>
                <span class="ml-1">Back</span>
              </v-btn>
            </span>
          </v-flex>

          <v-flex xs12 text-xs-center pt-4>
            <p class="title">
              <v-icon color="primary">event</v-icon>
              <span>{{ $moment(formData.timestamp).format('ddd, DD MMM YYYY') }}</span>
            </p>
          </v-flex>
        </v-layout>

          <v-jumbotron height="130px" color="green lighten-5">
            <v-container fill-height>
              <v-layout row wrap>
                <v-flex>
                  <span class="title mb-3 text-xs-left xs3">Workers Today </span>
                  <v-divider class="my-3"></v-divider>
                   <span class="subheading">Made, Ketut, Komang</span>

                    <v-btn
                          style="text-transform: capitalize; float: right;"
                           v-if="!this.formData.id"
                           depressed color="primary"
                          @click.stop="add"
                          :loading="addPending">Add Workers
                    </v-btn>

                </v-flex>
              </v-layout>
            </v-container>
          </v-jumbotron>

        <v-flex text-xs-center pt-4 pr-2 xs3>
          <v-text-field autofocus label="Weight in kg" type="number" v-model="formData.weight" />
        </v-flex>
        <v-flex pt-4 pr-2 xs3>
          <v-select :items="['Compost', 'Plastics', 'Metals']" v-model="formData.type" label="Type" />
        </v-flex>
        <v-flex pt-4 xs3>
          <v-text-field label="Comments" v-model="formData.comments" />
        </v-flex>

        <v-flex xs3 text-xs-center pt-4>
          <v-btn style="text-transform: capitalize"
                 v-if="this.formData.id"
                 depressed color="primary"
                @click.stop="save"
                @click.native="snackbar = true"
                :loading="savePending">Save
          </v-btn>
          <v-btn style="text-transform: capitalize"
                 v-if="!this.formData.id"
                 depressed color="primary"
                @click.stop="add"
                @click.native="snackbar = true"
                @click="$router.push('/manager/stock/')"
                :loading="addPending">Save
          </v-btn>
        </v-flex>

      </v-layout>


      <Header action="/manager/delivery-form" title="Compost" type="Compost"/>
      <CompostInventoryTable/>

      <Header class="mt-4" action="/manager/delivery-form" title="Plastic" type="Plastic"/>
      <PlasticInventoryTable/>

      <Header class="mt-4" action="/manager/delivery-form" title="Metals" type="Metals"/>
      <MetalsInventoryTable/>

    </v-flex>
    <v-snackbar
        :timeout="3000"
        :bottom="true"
        :multi-line="true"
        :vertical="true"
        color="green"
        v-model="snackbar"
      >
        {{ formData.weight }}kg of {{ formData.type }} was succesfully added at {{ $moment(formData.timestamp).format('hh:mm A') }}
      </v-snackbar>
  </v-layout>
</template>

<script>
import Header from './AddStockHeader'
import CompostInventoryTable from './CompostInventoryTable'
import PlasticInventoryTable from './PlasticInventoryTable'
import MetalsInventoryTable from './MetalsInventoryTable'

export default {
  props: {
    date: {
      type: String,
      required: false
    }
  },
  components: {
    Header, CompostInventoryTable, PlasticInventoryTable, MetalsInventoryTable
  },
  data () {
    return {
      formData: null,
      deletePending: false,
      savePending: false,
      addPending: false,
      fetchingDelivery: false,
      defaultFormData: {
        weight: 20,
        type: 'Compost',
        timestamp: new Date()
      }
    }
  },
  computed: {
    logDate () {
      const date = this.$moment(this.date)
      const today = this.$moment().startOf('day')
      return today > date ? date : today
    }
  },
  created () {
    const id = this.id
    if (id) {
      this.fetchStock(id)
    } else {
      this.formData = this.defaultFormData
    }
    console.log('WHAT', this.$firestore.collections.stock)
  },
  methods: {
    cancel () {
      this.formData = null
      this.showForm = false
    },
    async fetchStock (id) {
      const result = await this.$firestore.get('stock', id)
      this.formData = result
    },
    async save () {
      this.savePending = true
      await this.$firestore.update('stock', this.formData)
      this.savePending = false
    },
    async add () {
      this.addPending = true
      await this.$firestore.add('stock', this.formData)
      this.addPending = false
    }
  }
}
</script>
