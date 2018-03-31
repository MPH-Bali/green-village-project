<template>
  <v-layout row>
    <v-flex xs12 md8 offset-md2>
      <v-container fluid grid-list-lg v-if="form">
        <navigation-header />
        <v-layout row wrap>
          <v-flex xs4>
            <v-text-field
              solo flat class="accent"
              label="Weight"
              suffix="kg"
              type="number"
              v-model="form.weight" />
          </v-flex>
          <v-flex xs4>
            <v-select
              solo flat class="accent"
              :items="['Compost', 'Plastics', 'Metals']"
              v-model="form.type" label="Type" />
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
              v-model="form.subtype" label="Subtype" />
          </v-flex>
          <v-flex xs12>
            <v-text-field
              solo flat class="accent"
              label="Comments"
              v-model="form.comments"
              auto-grow multi-line/>
          </v-flex>

          <v-flex xs4>
            <v-btn color="error" flat outline @click.stop="$router.go(-1)">
              Cancel
            </v-btn>
          </v-flex>
          <v-flex xs8 text-xs-right>
            <v-btn
                  depressed color="primary"
                  @click.stop="save"
                  :loading="pending">
                  Save
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
    },
    materialType: {
      type: String,
      required: false
    }
  },
  async created () {
    if (this.id) {
      this.form = await this.$store.stock.collection.get(this.id)
    }
  },
  data () {
    return {
      form: {
        timestamp: new Date(),
        type: this.materialType
      },
      pending: false
    }
  },
  methods: {
    async save () {
      this.pending = true
      await this.$store.stock.collection.save(this.form)
      this.pending = false
      this.$emit('message', {
        text: 'Stock saved',
        type: 'success',
        ding: false
      })
      this.$router.go(-1)
    }
  }
}
</script>
