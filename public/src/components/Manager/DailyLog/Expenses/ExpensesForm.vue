<template>
  <v-container fluid grid-list-lg v-if="form">
    <v-layout row wrap>
      <v-flex xs12 md6>
        <p class='title'>Type</p>
        <v-select
          solo flat class="accent"
          :items="expenseTypes"
          v-model="form.type"
          @change="error = null"
          return-object />
      </v-flex>
      <v-flex xs12 md6>
        <p class='title'>Cost IDR</p>
        <v-text-field
          solo flat class="accent"
          type='number'
          @keyup="error = null"
          v-model="form.cost" />
      </v-flex>
      <v-flex xs12>
        <p class='title'>Notes</p>
        <v-text-field
          solo flat class='accent'
          auto-grow multi-line
          v-model="form.notes" />
      </v-flex>
      <v-flex xs12 text-xs-right>
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
      this.fetchingExpense = true
      this.form = await this.$store.expense.collection.get(this.id)
      this.fetchingExpense = false
    }
  },
  data () {
    return {
      savePending: false,
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
