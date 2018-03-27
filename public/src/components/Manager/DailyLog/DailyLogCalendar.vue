<template>
   <v-flex text-xs-center>
     <p class="title">
       <v-btn icon 
              class="mr-0 ml-0" 
              @click="fetchDayilyData(previousDay)">
         <v-icon>chevron_left</v-icon>
       </v-btn>
       <v-icon color="primary" @click="displayDatePicker">event</v-icon>
       <span @click="displayDatePicker">{{ $moment(logDate).format('ddd, DD MMM YYYY') }}</span>
       <v-btn icon 
              class="ml-0 mr-0"
             @click="fetchDayilyData(nextDay)" 
             :disabled="isToday">
         <v-icon>chevron_right</v-icon>
       </v-btn>
     </p>

     <v-dialog v-model="showDatePicker" width="290px">
        <v-card>
          <v-date-picker v-model="pickerDate" 
                         color="primary"
                        @input="fetchDayilyData">
          </v-date-picker>            
        </v-card>
      </v-dialog>

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
      pickerDate: null,
      showDatePicker: false
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
      this.showDatePicker = false
      this.$router.push({ name: 'dailyLogHistory', params: { date } })
      this.$firestore.changeDate(date)
    },
    displayDatePicker () {
      this.pickerDate = this.logDate.format('YYYY-MM-DD')
      this.showDatePicker = true
    }
  },
  created () {
    this.fetchDayilyData(this.logDate.format('YYYY-MM-DD'))
  }
}
</script>