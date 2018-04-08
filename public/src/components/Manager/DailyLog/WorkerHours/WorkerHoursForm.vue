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
            <p class='body-2 mb-0'>Time in</p>
            <v-layout row wrap>
              <v-flex xs7>
                <v-select solo flat :items="hours" v-model="checkIn" class="accent" />
              </v-flex>
              <v-flex xs5>
                <v-btn-toggle mandatory class="elevation-0" v-model="checkInPostfix">
                  <v-btn outline large class="primary--text px-3" value="AM">AM</v-btn>
                  <v-btn outline large class="primary--text px-3" value="PM">PM</v-btn>
                </v-btn-toggle>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 sm6>
            <p class='body-2 mb-0'>Time out</p>
            <v-layout row wrap>
              <v-flex xs7>
                <v-select solo flat :items="hours" v-model="checkOut" class="accent" />
              </v-flex>
              <v-flex xs5>
                <v-btn-toggle mandatory class="elevation-0" v-model="checkOutPostfix">
                  <v-btn outline large class="primary--text px-3" value="AM">AM</v-btn>
                  <v-btn outline large class="primary--text px-3" value="PM">PM</v-btn>
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
import moment from 'moment'

export default {
  props: {
    id: { type: String, required: false }
  },
  async created () {
    if (this.id) {
      this.form = await this.$store.workerhours.collection.get(this.id)

      const [ checkIn, checkInPostfix ] = moment(this.form.checkIn).format('hh:mm A').split(' ')
      this.checkIn = checkIn
      this.checkInPostfix = checkInPostfix

      const [ checkOut, checkOutPostfix ] = moment(this.form.checkOut).format('hh:mm A').split(' ')
      this.checkOut = checkOut
      this.checkOutPostfix = checkOutPostfix
    }
    this.loading = false
  },
  data () {
    return {
      tpTimestamp: null,
      checkIn: null,
      checkInPostfix: 'AM',
      checkOut: null,
      checkOutPostfix: 'AM',
      loading: true,
      savePending: false,
      error: null,
      form: { }
    }
  },
  computed: {
    hours () {
      // Generate times between 01:00 and 12:00
      return [...Array(12).keys()].map(x => {
        return ((x + 1) + ':00').padStart(5, '0')
      })
    },
    checkOutTimestamp () {
      return moment(moment().format('YYYY-MM-DD') + ' ' + this.checkOut + ' ' + this.checkOutPostfix, 'YYYY-MM-DD hh:mm A')
    },
    checkInTimestamp () {
      return moment(moment().format('YYYY-MM-DD') + ' ' + this.checkIn + ' ' + this.checkInPostfix, 'YYYY-MM-DD hh:mm A')
    },
    total () {
      const validDates = this.checkOutTimestamp.isValid() && this.checkInTimestamp.isValid()
      return validDates ? (this.checkOutTimestamp - this.checkInTimestamp) / 3600000 : 0
    }
  },
  methods: {
    validate () {
      if (!this.form.worker) this.error = 'You must select Worker'
      else if (!this.checkInTimestamp.isValid()) this.error = 'You must select when the worker came IN'
      else if (!this.checkOutTimestamp.isValid()) this.error = 'You must select when the worker went OUT'
      else if (this.total <= 0) this.error = 'Time OUT must be greater then IN'

      return this.error || this.save()
    },
    async save () {
      this.savePending = true
      await this.$store.workerhours.collection.save({
        ...this.form,
        notes: this.form.notes || '',
        checkIn: new Date(this.checkInTimestamp),
        checkOut: new Date(this.checkOutTimestamp),
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
