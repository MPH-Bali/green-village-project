<template>
  <v-layout row>
    <v-flex xs12 md8 offset-md2>
      <v-container fluid grid-list-lg v-if="form">
        <navigation-header />
        <v-layout row wrap>
          <v-flex xs12>
            <p class="body-2 mb-1">Worker name</p>
            <v-select solo flat :items="$store.workers.data"
              @change="error = null"
              v-model="form.worker"
              item-text="name"
              item-value="id"
              return-object
              class="accent" />
          </v-flex>

          <v-flex xs12 sm6>
            <p class='body-2 mb-0'>Time in {{ form.checkIn }}</p>
            <v-layout row wrap>
              <v-flex xs7>
                <v-select
                  solo flat
                  :items="hours"
                  v-model="form.checkIn"
                  class="accent" />
              </v-flex>
              <v-flex xs5>
                <v-btn-toggle
                  mandatory
                  class="elevation-0"
                  @change="togglePM('checkIn')"
                  v-model="inPM">
                  <v-btn outline large class="primary--text px-3">AM</v-btn>
                  <v-btn outline large class="primary--text px-3">PM</v-btn>
                </v-btn-toggle>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 sm6>
            <p class='body-2 mb-0'>Time out {{ form.checkOut }}</p>
            <v-layout row wrap>
              <v-flex xs7>
                <v-select
                  solo flat
                  :items="hours"
                  v-model="form.checkOut"
                  class="accent" />
              </v-flex>
              <v-flex xs5>
                <v-btn-toggle
                  mandatory
                  class="elevation-0"
                  @change="togglePM('checkOut')"
                  v-model="outPM">
                  <v-btn outline large class="primary--text px-3">AM</v-btn>
                  <v-btn outline large class="primary--text px-3">PM</v-btn>
                </v-btn-toggle>
              </v-flex>
            </v-layout>
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

      let checkIn = this.$moment(this.form.checkIn)
      if (checkIn.hours() >= 12) {
        this.form.checkIn = checkIn.hours(checkIn.hours() - 12)
        this.inPM = 1
      }

      let checkOut = this.$moment(this.form.checkOut)
      if (checkOut.hours() >= 12) {
        this.form.checkOut = checkOut.hours(checkOut.hours() - 12)
        this.outPM = 1
      }
    }
    this.loading = false
  },
  data () {
    return {
      inPM: 0,
      outPM: 0,
      loading: true,
      savePending: false,
      error: null,
      form: { }
    }
  },
  computed: {
    hours () {
      return [...Array(12).keys()].map(x => ({
        value: this.$moment().startOf('day').hour(x + 1),
        text: ((x + 1) + ':00').padStart(5, '0')
      }))
    },
    total () {
      return (!this.form.checkIn || !this.form.checkOut)
        ? 0 : (this.form.checkOut - this.form.checkIn) / 3600000
    }
  },
  methods: {
    togglePM (field) {
      const data = this.form[field]
      if (data) {
        const format = 'YYYY-MM-DD HH:mm:ss A'
        console.log(data.format(format))
        if (data.format('A') === 'AM') {
          this.form[field] = null
          this.form[field] = new Date(this.$moment(data.format(format).replace(' AM', 'PM'), format))
        } else {
          this.form[field] = null
          this.form[field] = new Date(this.$moment(data.format(format).replace(' PM', 'AM'), format))
        }
      }
    },
    validate () {
      const { worker, checkIn, checkOut } = this.form

      if (!worker) this.error = 'You must select Worker'
      else if (!checkIn) this.error = 'You must select when the worker came IN'
      else if (!checkOut) this.error = 'You must select when the worker went OUT'
      else if (checkOut < checkIn) this.error = 'Time OUT must be greater then IN'

      return this.error || this.save()
    },
    async save () {
      this.savePending = true
      await this.$store.workerhours.collection.save({
        ...this.form,
        notes: this.form.notes || '',
        checkIn: new Date(this.form.checkIn),
        checkOut: new Date(this.form.checkOut),
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
