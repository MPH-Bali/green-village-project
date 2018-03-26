import Vue from 'vue'
import Router from 'vue-router'

import Manager from '@/components/Manager/Manager'
import CustomerDetailView from '@/components/Manager/CustomerDetailView'
import DailyLog from '@/components/Manager/DailyLog/DailyLog'
import DeliveryForm from '@/components/Manager/Delivery/Form'
import AddMaterial from '@/components/Manager/AddMaterial'
import WorkerTimes from '@/components/Manager/WorkerTimes/Form'
import Customers from '@/components/Manager/Customers'
import Menu from '@/components/Manager/Menu/Menu'

import Buyers from '@/components/Manager/Buyers/Buyers'
import BuyerDetails from '@/components/Manager/Buyers/BuyerDetails'
import BuyerEdit from '@/components/Manager/Buyers/BuyerEdit'

import AddExpense from '@/components/Manager/Expenses/AddExpense'

import Public from '@/components/Public/Index'
import Home from '@/components/Public/Home'
import SignUp from '@/components/Public/SignUp'
import SignedUp from '@/components/Public/SignedUp'
import ContactUs from '@/components/Public/ContactUs'
import PickupSchedule from '@/components/Public/PickupSchedule'

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
        { path: 'contact-us', name: 'ContactUs', component: ContactUs },
        { path: 'pickup-schedule', name: 'PickupSchedule', component: PickupSchedule }
      ]
    },
    {
      path: '/manager',
      component: Manager,
      /**
       *  @desc the children.name value MUST coorlelate with the key in our i18n routeNames
       */
      children: [
        { path: '', name: 'dailyLog', component: DailyLog },
        { path: 'daily-log/:date?', name: 'dailyLogHistory', component: DailyLog, props: true },
        { path: 'delivery-form/:id?', name: 'deliveryForm', component: DeliveryForm, props: true },
        { path: 'buyers', name: 'buyers', component: Buyers },
        { path: 'buyer/details/:id?', name: 'buyer-details', component: BuyerDetails, props: true },
        { path: 'buyer/edit/:id?', name: 'buyer-edit', component: BuyerEdit, props: true },
        { path: 'material', name: 'addMaterial', component: AddMaterial },
        { path: 'worker-hours/:id?', name: 'workerHours', component: WorkerTimes, props: true },
        { path: 'customers/:id', name: 'customerDetail', component: CustomerDetailView, props: true },
        { path: 'customers', name: 'customers', component: Customers, props: true },
        { path: 'expense/:id?', name: 'addExpense', component: AddExpense, props: true },
        { path: 'menu', name: 'menu', component: Menu },
        { path: '*', redirect: '/manager' }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
