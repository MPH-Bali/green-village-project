import Vue from 'vue'
import Router from 'vue-router'

import Manager from '@/components/Manager'
import DailyLog from '@/components/Manager/DailyLog'
import DeliveryForm from '@/components/Manager/DeliveryForm'

import Public from '@/components/Public'
import Home from '@/components/Public/Home'
import SignUp from '@/components/Public/SignUp'
import SignedUp from '@/components/Public/SignedUp'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Public,
      children: [
        { path: '', name: 'Home', component: Home },
        { path: 'sign-up', name: 'SignUp', component: SignUp },
        { path: 'signed-up', name: 'SignedUp', component: SignedUp },
      ]
    },
    {
      path: '/manager',
      component: Manager,
      children: [
        { path: '', name: 'Daily Log', component: DailyLog },
        { path: 'daily-log/:date?', name: 'Daily Log History', component: DailyLog },
        { path: 'delivery-form/:id?', name: 'Delivery Form', component: DeliveryForm }
      ]
    }
  ]
})
