import Vue from 'vue'
import Router from 'vue-router'

import Manager from '@/components/Manager/Manager'
import DailyLog from '@/components/Manager/DailyLog/DailyLog'
import DeliveryForm from '@/components/Manager/Delivery/Form'
import AddMaterial from '@/components/Manager/AddMaterial'

import Public from '@/components/Public/Index'
import Home from '@/components/Public/Home'
import Login from '@/components/Public/Login/Login'
import SignUp from '@/components/Public/SignUp'

import { auth } from '@/firebase'

Vue.use(Router)

const router = new Router({
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
      /**
       *  @desc the children.name value MUST coorlelate with the key in our i18n routeNames
       */
      children: [
        { path: 'login', name: 'login', component: Login },
        { path: '', name: 'dailyLog', component: DailyLog, meta: { requiresAuth: true } },
        { path: 'daily-log/:date?', name: 'dailyLogHistory', component: DailyLog, props: true, meta: { requiresAuth: true } },
        { path: 'delivery-form/:id?', name: 'deliveryForm', component: DeliveryForm, props: true, meta: { requiresAuth: true } },
        { path: 'material', name: 'addMaterial', component: AddMaterial },
        { path: '*', redirect: '/manager' }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = auth.currentUser

  // This route requires auth, check if logged in, if not then redirect to login page.
  if (to.matched.some(record => record.meta.requiresAuth) && !currentUser) {
    next({
      path: '/manager/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
