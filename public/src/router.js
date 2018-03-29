import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const $c = component => Vue.component(component)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: $c('Public'),
      children: [
        { path: '', name: 'Home', component: $c('Home') },
        { path: 'sign-up', name: 'SignUp', component: $c('SignUp') },
        { path: 'signed-up', name: 'SignedUp', component: $c('SignedUp') },
        { path: 'contact-us', name: 'ContactUs', component: $c('ContactUs') },
        { path: 'pickup-schedule', name: 'PickupSchedule', component: $c('PickupSchedule') }
      ]
    },
    {
      path: '/manager',
      component: $c('Manager'),
      /**
       *  @desc the children.name value MUST coorlelate with the key in our i18n routeNames
       */
      children: [
        { path: 'login', name: 'login', component: $c('Login') },
        { path: '', name: 'dailyLog', component: $c('DailyLog') },
        { path: 'daily-log/:date?', name: 'dailyLogHistory', component: $c('DailyLog'), props: true },
        { path: 'delivery-form/:id?', name: 'deliveryForm', component: $c('DeliveryForm'), props: true },
        { path: 'buyers', name: 'buyers', component: $c('Buyers') },
        { path: 'buyer/details/:id?', name: 'buyer-details', component: $c('BuyerDetails'), props: true },
        { path: 'buyer/edit/:id?', name: 'buyer-edit', component: $c('BuyerEdit'), props: true },
        { path: 'material', name: 'addMaterial', component: $c('AddMaterial') },
        { path: 'worker-hours/:id?', name: 'workerHours', component: $c('WorkerTimesForm'), props: true },
        { path: 'customers/new', name: 'newCustomer', component: $c('NewCustomer'), props: true },
        { path: 'customers/:id', name: 'customerDetail', component: $c('CustomerDetailView'), props: true },
        { path: 'customers', name: 'customers', component: $c('Customers'), props: true },
        { path: 'stock', name: 'addStock', component: $c('AddStock'), props: true },
        { path: 'edit-stock-form/:id?', name: 'editStockForm', component: $c('EditStockForm'), props: true },
        { path: 'expense/:id?', name: 'addExpense', component: $c('AddExpense'), props: true },
        { path: 'menu', name: 'menu', component: $c('Menu') },
        { path: '*', redirect: '/manager' }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
