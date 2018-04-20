<template>
  <v-container fluid grid-list-lg v-if="form">
    <v-layout row wrap>
      <v-flex xs6>
        <p class="body-2 mb-1">Driver</p>
        <v-select
          tabindex=1
          autofocus
          solo flat class="accent"
          label="Pick a driver name"
          :items="$store.workers.data"
          item-value="id"
          item-text="name"
          return-object
          v-model="form.driver" />
      </v-flex>
      <v-flex xs6>
        <p class="body-2 mb-1">Banjar</p>
        <v-select
          tabindex=2
          solo flat class="accent"
          label="Select one ore more Banjars"
          :items="$store.banjar.data"
          item-value="id"
          item-text="name"
          return-object
          v-model="form.banjar" />
      </v-flex>
      <v-flex xs6>
        <p class="body-2 mb-1">Type</p>
        <v-select
          tabindex=3
          solo flat class="accent"
          label="Select Material Type"
          :items="['Organic', 'Inorganic']"
          v-model="form.type" />
      </v-flex>
      <v-flex xs6>
        <p class="body-2 mb-1">Weight</p>
        <v-text-field
          tabindex=4
          solo flat class="accent"
          type="number" min="0"
          v-model="form.weight" />
      </v-flex>

      <v-flex xs6>
        <v-btn
          tabindex=9
          color="error"
          flat outline
          @click.stop="$router.go(-1)">
          Cancel
        </v-btn>
      </v-flex>
      <v-flex xs6 text-xs-right>
        <v-btn
          depressed
          class="mx-0"
          color="primary"
          @click="save"
          :disabled="error"
          :loading="savePending">
          Save</v-btn>
      </v-flex>
    </v-layout>
    <v-alert type="error" :value="error" class='full-width'>
      {{ error }}
    </v-alert>
  </v-container>
</template>

<script>
export default {
  props: {
    id: { type: String, required: false }
  },
  async created () {
    if (this.id) {
      this.form = await this.$store.expense.collection.get(this.id)
      this.fetchingExpense = false
    }
  },
  data () {
    return {
      savePending: false,
      loading: true,
      error: null,
      form: {}
    }
  },
  computed: {
    expenseTypes () {
      const settings = this.$store.settings.data[0]
      return (settings && settings.expenseTypes) || []
    }
  },
  methods: {
    validate () {
      let errors = []
      if (!this.form.type) errors.push('You need to select expense type')
      if (!this.form.cost) errors.push('You need to specify expense cost')
      return (this.error = errors[0]) || this.save()
    },
    async save () {
      this.savePending = true

      await this.$store.expense.collection.save({
        ...this.form,
        timestamp: this.form.timestamp || new Date(),
        cost: parseInt(this.form.cost || 0)
      })

      this.$emit('message', {
        text: 'Expense saved',
        type: 'success'
      })

      this.savePending = false
      this.$router.go(-1)
    }
  }
}
</script>
