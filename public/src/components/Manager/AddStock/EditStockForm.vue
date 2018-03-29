<template>
  <v-layout row>
    <v-flex xs12 md8 offset-md2>
      <v-container fluid grid-list-lg v-if="formData">
        <navigation-header />
        <v-layout row wrap>
          <v-flex xs4>
            <v-text-field solo flat class="accent" label="Weight" suffix="kg" type="number" v-model="formData.weight" />
          </v-flex>
          <v-flex xs4>
            <v-select solo flat class="accent" :items="['Compost', 'Plastics', 'Metals']" v-model="formData.type" label="Type" />
          </v-flex>
          <v-flex xs4>
            <v-select
              solo flat class="accent"
              :items="[
              'PET Clear',
              'PET Colored',
              'HDPE',
              'PVC',
              'LDPE',
              'PP',
              'PS',
              'O',
              'ABS',
              'Cardboard',
              'Newspaper',
              'White paper',
              'Magazine',
              'Old book',
              'Cement sack',
              'Tetrapak',
              'Aluminium can',
              'Tin can',
              'Scrap metal',
              'Iron'
              ]"
              v-model="formData.subtype" label="Subtype" />
          </v-flex>
          <v-flex xs12>
            <v-text-field solo flat class="accent" label="Comments" v-model="formData.comments" auto-grow multi-line/>
          </v-flex>

          <v-flex xs4>
            <v-btn color="error" flat outline @click.stop="$router.go(-1)">Cancel</v-btn>
          </v-flex>
          <v-flex xs8 text-xs-right>
            <v-btn style="text-transform: capitalize"
                   v-if="this.formData.id"
                   depressed color="primary"
                  @click.stop="save"
                  :loading="savePending">Update
            </v-btn>
            <v-btn style="text-transform: capitalize"
                   v-if="!this.formData.id"
                   depressed color="primary"
                  @click.stop="add"
                  :loading="addPending">Create Delivery
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
      type: String,
      required: false
    }
  },
  data () {
    return {
      formData: null,
      deletePending: false,
      savePending: false,
      addPending: false,
      fetchingDelivery: false
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
      await this.$firestore.update('stock', this.formData)
      this.savePending = false
      this.$router.push({ name: 'addStock' })
    },
    async remove () {
      this.deletePending = true
      await this.$firestore.remove('stock', this.formData.id)
      this.deletePending = false
      this.$router.push({ name: 'addStock' })
    },
    async add () {
      this.addPending = true
      await this.$firestore.add('stock', this.formData)
      this.addPending = false
      this.$router.push({ name: 'addStock' })
    }
  }
}
</script>
