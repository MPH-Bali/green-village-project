<template>
  <v-layout row wrap>
    <v-flex xs12 md10 offset-md1 lg8 offset-lg2 v-show="showLogs">
      <v-layout row wrap pt-4>
        <daily-log-calendar :date="date"/>
      </v-layout>

      <daily-log-header
        action="/manager/delivery/form"
        :title="$t('headers.delivery')" />
      <delivery-table/>

      <daily-log-header
        class="mt-4"
        action="/manager/material/form"
        :title="$t('headers.materialKg')" />
      <material-table/>

      <daily-log-header
        class="mt-4"
        action="/manager/stock/form"
        title="Compost" />
      <stock-table material-type="Compost" />

      <daily-log-header
        class="mt-4"
        action="/manager/stock/form"
        title="Plastics" />
      <stock-table material-type="Plastics" />

      <daily-log-header
        class="mt-4"
        action="/manager/stock/form"
        title="Metals" />
      <stock-table material-type="Metals" />

      <daily-log-header
        class="mt-4"
        action="/manager/stock/form"
        title="Paper" />
      <stock-table material-type="Paper" />

      <daily-log-header
        class="mt-4"
        action="/manager/worker-hours/form"
        :title="$t('headers.workerHours')" />
      <workers-hours-table/>

      <daily-log-header
        class="mt-4"
        action="/manager/expenses/form"
        :title="$t('headers.addExpense')" />
      <expenses-table/>
    </v-flex>

    <v-slide-x-transition mode="out-in">
      <v-flex xs12 v-show="!showLogs">
        <router-view />
      </v-flex>
    </v-slide-x-transition>
  </v-layout>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    showLogs () {
      return (['dailyLog', 'dailyLogHistory']).includes(this.$route.name)
    }
  },
  data () {
    return {
      start: null,
      end: null
    }
  },
  created () {
    this.changeDate(this.date || new Date())
  },
  methods: {
    changeDate (date) {
      const newDate = this.$moment(date)
      const today = this.$moment().startOf('day')
      this.start = today > newDate ? newDate : today
      this.end = this.$moment(this.start).endOf('day')
      this.syncDailyData()
    },
    syncDailyData () {
      const addDayFilter = ref => ref
        .where('timestamp', '>=', new Date(this.start))
        .where('timestamp', '<=', new Date(this.end))

      this.$sync({
        delivery: addDayFilter(this.$db.collection('delivery')),
        material: addDayFilter(this.$db.collection('material')),
        workerhours: addDayFilter(this.$db.collection('workerhours')),
        expense: addDayFilter(this.$db.collection('expense')),
        stock: addDayFilter(this.$db.collection('stock'))
      })
    }
  }
}
</script>
