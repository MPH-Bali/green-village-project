// ToDo: Do this dynamically in vue-loader (if possible)
import Vue from 'vue'

import LineChart from './LineChart'
import BarChart from './BarChart'

Vue.component('line-chart', LineChart)
Vue.component('bar-chart', BarChart)
