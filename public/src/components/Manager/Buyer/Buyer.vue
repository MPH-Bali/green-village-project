<template>
  <v-layout row>
    <v-flex xs12 md8 offset-md2>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs6>
            <v-text-field label="Name" v-model="formData.name" />
          </v-flex>
          <v-flex xs6>
            <v-text-field label="Company" v-model="formData.company" />
          </v-flex>
          

          <v-flex xs6>
            <v-text-field label="E-mail" v-model="formData.email" />
          </v-flex>
          <v-flex xs6>
          </v-flex>

          <v-flex xs6>
            <v-text-field label="SMS/Call" v-model="formData.phone" />
          </v-flex>
          <v-flex xs6>
            <v-text-field label="Whatsapp" v-model="formData.whatsapp" />
          </v-flex>



          <v-flex xs6 text-xs-left>
            <v-btn color="error" 
                   outline
                   depressed 
                  @click.stop="$router.push({ name: 'Buyers' })" 
                  :loading="deletePending">Cancel
            </v-btn>
            <v-btn v-if="this.formData.id" 
                   color="error" 
                   depressed 
                  @click.stop="remove" 
                  :loading="deletePending">Delete
            </v-btn>
          </v-flex>
          <v-flex xs6 text-xs-right>
            <v-btn style="text-transform: capitalize" 
                   v-if="this.formData.id"
                   depressed color="primary" 
                  @click.stop="save" 
                  :loading="savePending">Save
            </v-btn>
            <v-btn style="text-transform: capitalize" 
                   v-if="!this.formData.id"
                   depressed color="primary" 
                  @click.stop="add" 
                  :loading="addPending">Create
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    id: {
      type: 'String',
      reqired: false
    }
  },
  data () {
    return {
      getPending: false,
      deletePending: false,
      savePending: false,
      addPending: false,
      formData: {}
    }
  },
  created () {
    if (this.id) this.fetchBuyer(this.id)
  },
  methods: {
    async fetchBuyer (id) {
      this.getPending = true
      const result = await this.$firestore.get('person', id)
      this.getPending = false
      this.formData = result
    },
    async add () {
      this.addPending = true
      this.formData.type = { buyer: true }
      this.formData.numberOfSales = 0
      await this.$firestore.add('person', this.formData)
      this.addPending = false
      this.$router.push({ name: 'Buyers' })
    },
    async save () {

    },
    async remove () {

    }
  }
}
</script>
