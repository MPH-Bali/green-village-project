// ToDo: Do this dynamically in vue-loader (if possible)
import Vue from 'vue'

import DailyLog from './DailyLog'
import DailyLogHeader from './DailyLogHeader'
import DeliveryForm from './DeliveryForm'
import DeliveryTable from './DeliveryTable'

Vue.component('daily-log', DailyLog)
Vue.component('daily-log-header', DailyLogHeader)
Vue.component('delivery-form', DeliveryForm)
Vue.component('delivery-table', DeliveryTable)
