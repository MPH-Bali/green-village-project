<template>
  <v-layout row>
    <v-flex xs12 md10 offset-md1 lg8 offset-lg2>
      <v-layout row wrap pt-4>
        <daily-log-calendar :date="date"/>
      </v-layout>

      <daily-log-header action="/manager/delivery-form" :title="$t('headers.delivery')" />
      <delivery-table/>

      <daily-log-header class="mt-4" action="/manager/material" :title="$t('headers.materialKg')" />
      <daily-log-material-table/>

      <!-- <daily-log-header class="mt-4" action="/manager/stock" title="Compost" />
      <daily-log-stock-table material-type="Compost" />

      <daily-log-header class="mt-4" action="/manager/stock" title="Plastics" />
      <daily-log-stock-table material-type="Plastics" />

      <daily-log-header class="mt-4" action="/manager/stock" title="Metals" />
      <daily-log-stock-table material-type="Metals" />

      <daily-log-header class="mt-4" action="/manager/stock" title="Paper" />
      <daily-log-stock-table material-type="Paper" />

      <daily-log-header class="mt-4" action="/manager/worker-hours" :title="$t('headers.workerHours')" />
      <daily-log-workers-table/>

      <daily-log-header class="mt-4" action="/manager/expense" :title="$t('headers.addExpense')" />
      <daily-log-expenses-table/> -->
    </v-flex>
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
  }
}
</script>
