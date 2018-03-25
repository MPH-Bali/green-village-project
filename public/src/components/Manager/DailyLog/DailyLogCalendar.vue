<template>
   <v-flex text-xs-center>
     <p class="title">
       <v-btn icon class="mr-3" @click="fetchDayilyData(previousDay)">
         <v-icon>chevron_left</v-icon>
       </v-btn>
       <v-icon color="primary">event</v-icon>
       <span>{{ $moment(logDate).format('ddd, DD MMM YYYY') }}</span>
       <v-btn icon 
              class="ml-3"
             @click="fetchDayilyData(nextDay)" 
             :disabled="isToday">
         <v-icon>chevron_right</v-icon>
       </v-btn>
     </p>
   </v-flex>
</template>

<script>

export default {
  props: {
    date: {
      type: String,
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    logDate () {
      const date = this.$moment(this.date)
      const today = this.$moment().startOf('day')
      return today > date ? date : today
    },
    nextDay () {
      return this.$moment(this.logDate).add(1, 'day').format('YYYY-MM-DD')
    },
    previousDay () {
      return this.$moment(this.logDate).subtract(1, 'day').format('YYYY-MM-DD')
    },
    isToday () {
      return this.$moment(this.nextDay) > this.$moment().startOf('day')
    }
  },
  methods: {
    fetchDayilyData (date) {
      this.$router.push({ name: 'dailyLogHistory', params: { date } })
      this.$firestore.changeDate(date)
    }
  },
  created () {
    this.fetchDayilyData(this.logDate.format('YYYY-MM-DD'))
  }
}
</script>
