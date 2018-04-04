<template>
  <v-container fluid grid-list-lg >
    <navigation-header />
    <v-layout row wrap>
      <v-flex xs12 sm3>
        <p class='title'>Type</p>
        <v-select
          solo flat color="primary"
          :items="expenseTypes"
          v-model="form.type"
          @change="error = null"
          return-object />
      </v-flex>
      <v-flex xs12 sm3>
        <p class='title'>Cost IDR</p>
        <v-text-field
          solo flat color="primary"
          type='number'
          @keyup="error = null"
          v-model="form.cost" />
      </v-flex>
      <v-flex xs12 sm4>
        <p class='title'>Notes</p>
        <v-text-field
          solo flat class='grey-select'
          v-model="form.notes" />
      </v-flex>
      <v-flex xs12 sm2>
        <p class='title'>&nbsp;</p>
        <v-btn
          @click="save"
          :disabled="error.show"
          :loading="savePending"
          color="success">Save</v-btn>
      </v-flex>
    </v-layout>
    <v-alert type="error" :value="error.show" class='full-width'>{{ error.msg }}</v-alert>
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
      error: null,
      form: {}
    }
  },
  computed: {
    expenseTypes () {
      const settings = this.$store.settings[0]
      return (settings && settings.expenseTypes) || []
    }
  },
  methods: {
    validate () {
      let errors = []
      if (!this.form.type) errors.push('You need to select expense type')
      if (!this.form.cost) errors.push('You need to specify expense cost')
      return (this.error = error[0]) || save()
    },
    async save () {
      this.savePending = true

      await this.$store.expense.collection.save({
        ...this.form,
        timestamp: this.form.timestamp || new Date(),
        cost = parseInt(this.form.cost || 0)
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
