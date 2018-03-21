import Vue from 'vue'
import Router from 'vue-router'

import DailyLog from '@/components/DailyLog/DailyLog'
import DeliveryForm from '@/components/DeliveryForm/DeliveryForm'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: DailyLog
    },
    {
      path: '/daily-log/:date?',
      name: 'Daily Log',
      component: DailyLog,
      props: true
    },
    {
      path: '/delivery-form/:id?',
      name: 'Delivery Form',
      component: DeliveryForm,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
