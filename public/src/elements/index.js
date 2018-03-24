// ToDo: Do this dynamically in vue-loader (if possible)
import Vue from 'vue'

import LineChart from './LineChart'
import BarChart from './BarChart'
import DoughnutChart from './DoughnutChart'
import HorizontalBarChart from './HorizontalBarChart'


Vue.component('line-chart', LineChart)
Vue.component('bar-chart', BarChart)
Vue.component('doughnut-chart', DoughnutChart)
Vue.component('horizontal-bar-chart', HorizontalBarChart)

