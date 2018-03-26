<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="primary">
          <v-card-text>
            <h2 class="subheading white--text">{{ $t("home.welcome") }}</h2>
            <h1 class="display-1 white--text">{{facilityData.name}} Facility</h1>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-avatar color="grey lighten-2" size="80px">
              <v-icon size="50px">people</v-icon>
            </v-avatar>
            <h1 class="headline mt-2">MEMBERS</h1>
            <p>We’re already a lot, but we want all {{customerData.householdCount}} Pererenan households to join us!</p>
            <horizontal-bar-chart :height="50" :chart-data="customerData" :options="horizontalBarChartOptions" />
            <v-btn color="primary" depressed @click="$router.push('/sign-up')">Join Us</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card color="grey lighten-2">
          <v-card-text>
            <h1 class="headline mt-2">Recycling Efficiency</h1>
            <doughnut-chart :height="300" :chart-data="materialData" />
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-avatar color="grey lighten-2" size="80px">
              <v-icon size="50px">multiline_chart</v-icon>
            </v-avatar>
            <h1 class="headline mt-2">{{facilityData.name}}</h1>
            <h1 class="headline">FACILITY DATA</h1>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 md6>
        <v-card>
          <v-card-text class="text-xs-center">
            <h1 class="title">Daily stock</h1>
            <line-chart :height="300" :chart-data="dailyStockData" />
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 md6>
        <v-card>
          <v-card-text class="text-xs-center">
            <h1 class="title">Revenue</h1>
            <line-chart :height="300" :chart-data="revenueData" />
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 md6>
        <v-card>
          <v-card-text class="text-xs-center">
            <h1 class="title">Expenses</h1>
            <bar-chart :height="300" :chart-data="expensesData" :options="barChartOptions" />
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 md6>
        <v-card>
          <v-card-text class="text-xs-center">
            <h1 class="title">Income</h1>
            <bar-chart :height="300" :chart-data="incomeData" :options="barChartOptions" />
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card color="grey lighten-2">
          <v-card-text>
            <v-avatar color="grey lighten-2" size="80px">
              <v-icon size="50px">assignment_turned_in</v-icon>
            </v-avatar>
            <h1 class="headline mt-2">COLLECTION</h1>
            <v-layout row>
              <v-flex xs6 sm6 md6>
                <v-icon size="50px">multiline_chart</v-icon>
                <h1 class="title">{{pickupsData.totalPickups}}</h1>
                <h1 class="mb-3 headline primary--text">PICKUPS</h1>
              </v-flex>
              <v-flex xs6 sm 6 md6>
                <h1 class="title">{{pickupsData.totalWeight}}</h1>
                <h1 class="mb-3 headline primary--text">Tons</h1>
              </v-flex>
          </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-avatar color="grey lighten-2" size="80px">
              <v-icon size="50px">assignment_turned_in</v-icon>
            </v-avatar>
            <h1 class="headline mt-2">TEAM</h1>
            <p>Pickups for {{facilityData.name}} are scheduled as follow:</p>
            <v-container fluid grid-list-xl>
              <v-layout row>
                 <v-flex xs4 sm4 md4 style="align-self: center;">
                  <v-avatar slot="activator">
                    <img src="http://mph-bali.org/wp-content/uploads/2016/08/logo.png" alt="">
                  </v-avatar>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <p>{{facilityData.employees[0].firstName}} {{facilityData.employees[0].lastName}}</p>
                  <p>{{facilityData.employees[0].role}}</p>
                </v-flex>
            </v-layout>

          <v-flex xs12>
            <v-card>
              <v-card-text class="text-xs-center">
                <h1 class="title">Working Hours</h1>
                <bar-chart :height="300" :chart-data="hoursData" :options="horizontalBarChartOptions" />
              </v-card-text>
            </v-card>
            </v-flex>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card color="grey lighten-2">
          <v-card-text>
            <v-avatar color="grey lighten-2" size="80px">
              <v-icon size="50px">assignment_turned_in</v-icon>
            </v-avatar>
            <h1 class="headline mt-2">Banner Materials</h1>
            <p>Pickups for {{facilityData.name}} are scheduled as follow:</p>
            <v-container fluid grid-list-xl>
              <v-layout row>
                 <v-flex xs4 sm4 md4 style="align-self: center;">
                  <v-avatar slot="activator">
                    <img src="http://mph-bali.org/wp-content/uploads/2016/08/logo.png" alt="">
                  </v-avatar>
                </v-flex>
                <v-flex xs8>
                  <p>Download information and PDF to understand what we're doing</p>
                </v-flex>
            </v-layout>
          </v-container>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-avatar color="grey lighten-2" size="80px">
              <v-icon size="50px">assignment_turned_in</v-icon>
            </v-avatar>
            <h1 class="headline mt-2">{{ $t('headers.newsletterSignup')}}</h1>
            <p>{{ $t('common.newsletterSignup') }}</p>
            <v-form ref="form" lazy-validation>
              <v-text-field label="Email" flat v-model="form.email" :rules="emailRules" required />
            </v-form>
            <v-btn @click="submit" color="primary" type="submit" depressed>{{ $t('forms.joinus') }}</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    submit () {
      console.log('Submit join us')
    }
  },
  computed: {
    pickupsData () {
      return {
        totalPickups: this.$firestore.charts.totalPickups,
        totalWeight: this.$firestore.charts.totalMaterialWeight
      }
    },
    hoursData () {
      return {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Hours',
            fill: false,
            backgroundColor: '#cd2027',
            borderColor: '#cd2027',
            data: this.$firestore.charts.workerHours
          }
        ]
      }
    }
  },
  data () {
    return {
      form: {},
      facilityData: {
        name: 'Pererenan',
        employees: [
          {
            firstName: 'Made',
            lastName: 'Kutu',
            role: 'Facility Manager'
          },
          {
            firstName: 'Putu',
            lastName: 'Futu',
            role: 'Community Manager'
          },
          {
            firstName: 'Mutu',
            lastName: 'Lutu',
            role: 'Manager'
          }
        ]
      },
      householdData: {
        labels: ['businesses', 'villa', 'household'],
        datasets: [
          {
            data: [35, 20, 60],
            backgroundColor: ['#4a90e2', '#d1dfd0', '#cc8a8c']
          }
        ]
      },
      dailyStockData: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Material',
            fill: false,
            backgroundColor: '#4a90e2',
            borderColor: '#4a90e2',
            data: [35, 43, 46, 64, 60, 75, 90]
          }, {
            label: 'Organic',
            fill: false,
            backgroundColor: '#42853d',
            borderColor: '#42853d',
            data: [10, 38, 55, 50, 82, 90, 130]
          }
        ]
      },
      customerData: {
        householdCount: 35,
        datasets: [
          {
            label: 'businesses',
            backgroundColor: '#4a90e2',
            data: [65]
          }, {
            label: 'villa',
            backgroundColor: '#cc8a8c',
            data: [17]
          }, {
            label: 'households',
            backgroundColor: '#d1dfd0',
            data: [35]
          }
        ]
      },
      revenueData: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Expenses',
            fill: false,
            backgroundColor: '#cd2027',
            borderColor: '#cd2027',
            data: [35, 43, 46, 64, 60, 75, 90]
          }, {
            label: 'Income',
            fill: false,
            backgroundColor: '#42853d',
            borderColor: '#42853d',
            data: [10, 38, 55, 50, 82, 90, 130]
          }
        ]
      },
      expensesData: {
        labels: ['Oct 17', 'Nov 17', 'Dec 17', 'Jan 18', 'Feb 18'],
        datasets: [
          {
            label: 'Maintenance',
            backgroundColor: '#4a90e2',
            data: [65, 45, 60, 65, 52]
          }, {
            label: 'Fuel',
            backgroundColor: '#cc8a8c',
            data: [17, 18, 17, 18, 17]
          }, {
            label: 'Salaries',
            backgroundColor: '#d1dfd0',
            data: [35, 20, 20, 20, 35]
          }, {
            label: 'Equipment',
            backgroundColor: '#e7e582',
            data: [30, 30, 25, 25, 30]
          }
        ]
      },
      incomeData: {
        labels: ['Oct 17', 'Nov 17', 'Dec 17', 'Jan 18', 'Feb 18'],
        datasets: [
          {
            label: 'Oragnic',
            backgroundColor: '#4a90e2',
            data: [65, 45, 60, 65, 52]
          }, {
            label: 'Material',
            backgroundColor: '#cc8a8c',
            data: [17, 18, 17, 18, 17]
          }, {
            label: 'Fees',
            backgroundColor: '#d1dfd0',
            data: [35, 20, 20, 20, 35]
          }
        ]
      },
      materialData: {
        labels: ['Compost', 'Material', 'Landfill'],
        datasets: [
          {
            data: [35, 20, 60],
            backgroundColor: ['#4a90e2', '#d1dfd0', '#cc8a8c']
          }
        ]
      },
      barChartOptions: {
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }]
        }
      },
      horizontalBarChartOptions: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }]
        }
      },
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  }
}
</script>

<style scoped>

</style>
