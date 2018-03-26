<template>
  <v-layout>
    <v-flex xs12 md10 offset-md1 lg8 offset-lg2 pt-4>
      <navigation-header />
      <v-layout row wrap pt-4>
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
          <v-text-field
            solo flat class="accent"
            autofocus
            label="Weight in kg"
            type="number"
            v-model="formData.weight" />
        </v-flex>
        <v-flex pt-4 pr-2 xs3>
          <v-select
            solo flat class="accent"
            :items="['Compost', 'Plastics', 'Metals', 'Paper']"
            v-model="formData.type" label="Type" />
        </v-flex>
        <v-flex pt-4 xs3>
          <v-text-field
            solo flat class="accent"
            label="Comments"
            v-model="formData.comments" />
        </v-flex>
        <v-flex xs3 text-xs-right pt-4>
          <v-btn depressed color="primary"
            @click.stop="save"
            :loading="savePending">Save
          </v-btn>
        </v-flex>
      </v-layout>

      <h1 class="mt-5 mb-4 pl-3 title">Compost</h1>
      <stock-table material-type="Compost" />

      <h1 class="mt-5 mb-4 pl-3 title">Plastics</h1>
      <stock-table material-type="Plastics" />

      <h1 class="mt-5 mb-4 pl-3 title">Metals</h1>
      <stock-table material-type="Metals" />

      <h1 class="mt-5 mb-4 pl-3 title">Paper</h1>
      <stock-table class="mb-5" material-type="Paper" />

    </v-flex>
  </v-layout>
</template>

<script>
import StockTable from './Table'
import NavigationHeader from '@/elements/NavigationHeader'

export default {
  props: {
    date: { type: String, required: false }
  },
  components: {
    StockTable,
    NavigationHeader
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
  created () {
    const id = this.id
    if (id) {
      this.fetchStock(id)
    } else {
      this.formData = this.defaultFormData
    }
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
      await this.$firestore.save('stock', this.formData)
      this.$emit('message', {
        text: 'Stock saved',
        type: 'success',
        ding: true
      })
      this.savePending = false
    }
  }
}
</script>
