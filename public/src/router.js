import Vue from 'vue'
import Router from 'vue-router'

import Manager from '@/components/Manager/Manager'
import DailyLog from '@/components/Manager/DailyLog/DailyLog'
import DeliveryForm from '@/components/Manager/DeliveryForm/DeliveryForm'

import Public from '@/components/Public/Index'
import Home from '@/components/Public/Home'
import SignUp from '@/components/Public/SignUp'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Public,
      children: [
        { path: '', name: 'Home', component: Home },
        { path: 'sign-up', name: 'SignUp', component: SignUp }
      ]
    },
    {
      path: '/manager',
      component: Manager,
      // please set the `name` to the appropriate key inside our i18n config
      children: [
        { path: '', name: 'dailyLog', component: DailyLog },
        { path: 'daily-log/:date?', name: 'dailyLogHistory', component: DailyLog, props: true },
        { path: 'delivery-form/:id?', name: 'deliveryForm', component: DeliveryForm, props: true },
        { path: '*', redirect: '/manager' }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
