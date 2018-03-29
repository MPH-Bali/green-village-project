<template>
  <v-layout row>
    <v-flex xs12 md10 offset-md1 lg8 offset-lg2>
      <v-layout row wrap pt-4>
        <Calendar :date="date"/>
      </v-layout>

      <log-header action="/manager/delivery-form" :title="$t('headers.delivery')" />
      <delivery-table/>

      <log-header class="mt-4" action="/manager/material" :title="$t('headers.materialKg')" />
      <MaterialTable/>

      <log-header class="mt-4" action="/manager/stock" title="Compost" />
      <StockTable material-type="Compost" />

      <log-header class="mt-4" action="/manager/stock" title="Plastics" />
      <StockTable material-type="Plastics" />

      <log-header class="mt-4" action="/manager/stock" title="Metals" />
      <StockTable material-type="Metals" />

      <log-header class="mt-4" action="/manager/stock" title="Paper" />
      <StockTable material-type="Paper" />

      <log-header class="mt-4" action="/manager/worker-hours" :title="$t('headers.workerHours')" />
      <WorkerTimes/>

      <log-header class="mt-4" action="/manager/expense" :title="$t('headers.addExpense')" />
      <ExpensesTable/>
    </v-flex>
  </v-layout>
</template>

<script>
import LogHeader from './DailyLogHeader'
import DeliveryTable from '@/components/Manager/Delivery/Table'
import MaterialTable from './DailyLogMaterialTable'
import StockTable from './DailyLogStockTable'
import WorkerTimes from './DailyLogWorkersTable'
import ExpensesTable from './DailyLogExpensesTable'
import Calendar from './DailyLogCalendar'

export default {
  props: {
    date: {
      type: String,
      required: false,
      default: ''
    }
  },
  components: {
    LogHeader,
    DeliveryTable,
    MaterialTable,
    WorkerTimes,
    ExpensesTable,
    StockTable,
    Calendar
  },
  data () {
    return {
    }
  }
}
</script>
