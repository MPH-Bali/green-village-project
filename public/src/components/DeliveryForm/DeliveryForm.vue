<template>
  <v-layout row>
    <v-flex xs12 md8 offset-md2>
      <v-container fluid grid-list-lg v-if="formData">
        <v-layout row wrap>
          <v-flex xs12 text-xs-center pt-4>
            <p class="title">
              <v-icon color="primary">event</v-icon>
              <span>{{ $moment(formData.timestamp).format('ddd, DD MMM YYYY') }}</span>
            </p>
          </v-flex>
          <v-flex xs6>
            <v-text-field solo flat label="Organic" suffix="kg" type="number" v-model="formData.organic" />
          </v-flex>
          <v-flex xs6>
            <v-text-field solo flat label="Anorganic" suffix="kg" type="number" v-model="formData.anorganic" />
          </v-flex>
          <v-flex xs3>
            <v-text-field solo flat label="No. households" type="number" v-model="formData.households" />
          </v-flex>
          <v-flex xs3>
            <v-text-field solo flat label="No. businesses" type="number" v-model="formData.businesses" />
          </v-flex>
          <v-flex xs3>
            <v-text-field solo flat label="No. villas" type="number" v-model="formData.villas" />
          </v-flex>
          <v-flex xs3>
            <v-text-field solo flat label="No. facilities" type="number" v-model="formData.facilities" />
          </v-flex>
          <v-flex xs6>
            <v-select solo flat :items="['Putu', 'Kutu', 'Tutu']" v-model="formData.driver" label="Driver" />
          </v-flex>
          <v-flex xs6>
            <v-select solo flat :items="['Somewhere', 'Here', 'There']" v-model="formData.banjar" label="Banjar" />
          </v-flex>
          <v-flex xs12>
            <v-text-field solo flat label="Comments" v-model="formData.comments" auto-grow multi-line/>
          </v-flex>

          <v-flex xs4>
            <v-btn color="error" flat outline @click.stop="$router.go(-1)">Cancel</v-btn>
          </v-flex>
          <v-flex xs4 text-xs-center>
            <v-btn v-if="this.formData.id" 
                   color="error" 
                   depressed 
                  @click.stop="remove" 
                  :loading="deletePending">Delete
            </v-btn>
          </v-flex>
          <v-flex xs4 text-xs-right>
            <v-btn style="text-transform: capitalize" 
                   depressed color="primary" 
                  @click.stop="save" 
                  :loading="savePending">Save Delivery
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    id: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      formData: null,
      deletePending: false,
      savePending: false,
      fetchingDelivery: false,
      defaultFormData: {
        anorganic: 20,
        organic: 20,
        households: 20,
        banjar: 'There',
        comments: 'Foo',
        driver: 'Putu',
        timestamp: new Date()
      }
    }
  },
  created () {
    const id = this.id
    if (id) {
      this.fetchDelivery(id)
    } else {
      this.formData = this.defaultFormData
    }
  },
  computed: {
    ...mapGetters({
      getDeliveryById: 'delivery/getDeliveryById'
    })
  },
  methods: {
    ...mapActions({
      fetchItem: 'delivery/fetchItem',
      saveItem: 'delivery/saveItem',
      deleteItem: 'delivery/deleteItem'
    }),
    cancel () {
      this.formData = null
      this.showForm = false
    },
    async fetchDelivery (id) {
      const response = await this.fetchItem({ id })
      if (response.success) {
        this.formData = this.getDeliveryById(id)
      } else {
        console.log(response.error)
        // show toast
      }
    },
    async save () {
      this.savePending = true
      const response = await this.saveItem({ form: this.formData })
      this.savePending = false
      if (response.success) {
        this.$router.push({ name: 'Daily Log' })
      } else {
        console.log(response.error)
        // show toast
      }
    },
    async remove () {
      this.deletePending = true
      const response = await this.deleteItem({ id: this.formData.id })
      this.deletePending = false
      if (response.success) {
        this.$router.push({ name: 'Daily Log' })
      } else {
        console.log(response.error)
        // show toast
      }
    }
  }
}
</script>
