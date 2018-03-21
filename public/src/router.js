import Vue from 'vue'
import Router from 'vue-router'

import Manager from '@/components/Manager'
import DailyLog from '@/components/Manager/DailyLog'
import DeliveryForm from '@/components/Manager/DeliveryForm'

import Public from '@/components/Public'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Public',
      component: Public
    },
    {
      path: '/manager',
      component: Manager,
      children: [
        { path: '', name: 'Daily Log', component: DailyLog },
        { path: 'daily-log/:date?', name: 'Daily Log', component: DailyLog },
        { path: 'delivery-form/:id?', name: 'Delivery Form', component: DeliveryForm }
      ]
    }
  ]
})
