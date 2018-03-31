import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Vue.component('Public'),
      children: [
        {
          path: '',
          name: 'Home',
          component: Vue.component('Home')
        }, {
          path: 'sign-up',
          name: 'SignUp',
          component: Vue.component('SignUp')
        }, {
          path: 'signed-up',
          name: 'SignedUp',
          component: Vue.component('SignedUp')
        }, {
          path: 'contact-us',
          name: 'ContactUs',
          component: Vue.component('ContactUs')
        }, {
          path: 'pickup-schedule',
          name: 'PickupSchedule',
          component: Vue.component('PickupSchedule')
        }
      ]
    },
    {
      path: '/manager',
      component: Vue.component('Manager'),
      /**
       *  @desc the children.name value MUST coorlelate with the key in our i18n routeNames
       */
      children: [
        {
          path: 'login',
          name: 'login',
          component: Vue.component('Login')
        }, {
          path: '',
          name: 'dailyLog',
          component: Vue.component('DailyLog'),
          children: [
            {
              path: 'delivery/form/:id?',
              name: 'deliveryForm',
              component: Vue.component('DeliveryForm'),
              props: true
            }, {
              path: 'material/form/:id?',
              name: 'materialForm',
              component: Vue.component('MaterialForm')
            }, {
              path: 'worker-hours/form/:id?',
              name: 'workerHoursForm',
              component: Vue.component('WorkerHoursForm'),
              props: true
            }, {
              path: 'stock/form/:id?',
              name: 'stockForm',
              component: Vue.component('StockForm'),
              props: true
            }, {
              path: 'expenses/form/:id?',
              name: 'expensesForm',
              component: Vue.component('ExpensesForm'),
              props: true
            }
          ]
        }, {
          path: 'daily-log/:date?',
          name: 'dailyLogHistory',
          component: Vue.component('DailyLog'),
          props: true
        }, {
          path: 'buyers',
          name: 'buyers',
          component: Vue.component('Buyers')
        }, {
          path: 'buyer/details/:id?',
          name: 'buyerDetails',
          component: Vue.component('BuyerDetails'),
          props: true
        }, {
          path: 'buyer/form/:id?',
          name: 'buyerForm',
          component: Vue.component('BuyerForm'),
          props: true
        }, {
          path: 'customers/form/:id?',
          name: 'customerForm',
          component: Vue.component('CustomerForm'),
          props: true
        }, {
          path: 'customers/:id',
          name: 'customerDetails',
          component: Vue.component('CustomerDetails'),
          props: true
        }, {
          path: 'customers',
          name: 'customers',
          component: Vue.component('Customers'),
          props: true
        },
        {
          path: 'menu',
          name: 'menu',
          component: Vue.component('Menu')
        }, {
          path: '*',
          redirect: '/manager'
        }
      ]
    }, {
      path: '*',
      redirect: '/'
    }
  ]
})
