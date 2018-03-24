// ToDo: Do this dynamically in vue-loader (if possible)
import Vue from 'vue'

import DailyLog from './Manager/DailyLog'
import DailyLogHeader from './Manager/DailyLogHeader'
import DeliveryForm from './Manager/DeliveryForm'
import DeliveryTable from './Manager/DeliveryTable'
import NavigationHeader from './Manager/Ui/NavigationHeader'

Vue.component('daily-log', DailyLog)
Vue.component('daily-log-header', DailyLogHeader)
Vue.component('delivery-form', DeliveryForm)
Vue.component('delivery-table', DeliveryTable)
Vue.component('navigation-header', NavigationHeader)
