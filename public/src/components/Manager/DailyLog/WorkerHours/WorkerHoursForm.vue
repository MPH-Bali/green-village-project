<template>
  <v-layout row>
    <v-flex xs12 md8 offset-md2>
      <v-container fluid grid-list-lg v-if="form">
        <navigation-header />
        <v-layout row wrap>
          <v-flex xs12>
            <p class="body-2 mb-1">Worker name</p>
            <v-select solo flat :items="$store.workers.data"
              v-model="form.worker"
              item-text="name"
              item-value="id"
              return-object
              class="accent" />
          </v-flex>

          <v-flex xs12 sm6>
            <p class='body-2 mb-0'>Time in</p>
            <time-picker v-model="form.checkIn" />
          </v-flex>

          <v-flex xs12 sm6>
            <p class='body-2 mb-0'>Time out</p>
            <time-picker v-model="form.checkOut" />
          </v-flex>

          <v-flex xs12 mb-3>
            <p class="body-2 mb-1">Notes</p>
            <v-text-field
              v-model="form.notes"
              multi-line
              auto-grow
              class="accent"
              solo flat />
          </v-flex>

          <v-flex xs4>
            <v-btn depressed color="error" @click="$router.go(-1)">
              Cancel
            </v-btn>
          </v-flex>
          <v-flex xs4 text-xs-center>
            <span class="title">Total Hours</span>
            <p class="display-1" style="font-weight: 300">
              {{ total }} Hours
            </p>
          </v-flex>
          <v-flex xs4 text-xs-right>
            <v-btn depressed color="primary" @click="validate" :loading="savePending">
              Save
            </v-btn>
          </v-flex>
        </v-layout>
        <v-alert type="error" :value="error" class="full-width">
          {{ error }}
        </v-alert>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    id: { type: String, required: false }
  },
  async created () {
    if (this.id) {
      this.form = await this.$store.workerhours.collection.get(this.id)
    }
    this.loading = false
  },
  watch: {
    form: {
      handler () { this.error = null },
      deep: true
    }
  },
  data () {
    return {
      loading: true,
      savePending: false,
      error: null,
      form: { }
    }
  },
  computed: {
    total () {
      const { checkIn, checkOut } = this.form
      return checkIn && checkOut ? (checkOut - checkIn) / 3600000 : 0
    }
  },
  methods: {
    validate () {
      const { worker, checkIn, checkOut } = this.form

      if (!worker) this.error = 'You must select Worker'
      else if (!checkIn) this.error = 'You must select when the worker came IN'
      else if (!checkOut) this.error = 'You must select when the worker went OUT'
      else if (this.total <= 0) this.error = 'Time OUT must be greater then IN'

      return this.error || this.save()
    },
    async save () {
      this.savePending = true
      await this.$store.workerhours.collection.save({
        ...this.form,
        timestamp: this.form.timestamp || new Date()
      })

      this.savePending = false

      this.$emit('message', {
        text: 'Worker hours saved',
        type: 'success'
      })

      this.$router.go(-1)
    }
  }
}
</script>
