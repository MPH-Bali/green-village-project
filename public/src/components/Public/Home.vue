<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="primary">
          <v-card-text>
            <h2 class="subheading white--text">{{ $t("home.welcome") }}</h2>
            <h1 class="display-1 white--text">Pererenan Facility</h1>
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
            <p>We’re already a lot, but we want all 805 Pererenan households to join us!</p>
            <v-progress-linear value="75" height="20" color="primary" />
            <v-btn color="primary" depressed @click="$router.push('/sign-up')">Join Us</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-card-text>
            <h1 class="headline mt-2">Recycling Efficiency</h1>
            <doughnut-chart :height="300" :chart-data="recyclingData" :options="ChartOptions" />
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-avatar color="grey lighten-2" size="80px">
              <v-icon size="50px">multiline_chart</v-icon>
            </v-avatar>
            <h1 class="headline mt-2">PERERENAN</h1>
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
        <v-card>
          <v-card-text>
            <v-avatar color="grey lighten-2" size="80px">
              <v-icon size="50px">assignment_turned_in</v-icon>
            </v-avatar>
            <h1 class="headline mt-2">COLLECTION</h1>
            <v-layout row>
              <v-flex xs4 sm4 md4>
                <h1 class="title">Banajar 1:</h1>
                <h1 class="mb-3 headline primary--text">DRIVEN</h1>
              </v-flex>
              <v-flex xs4 sm4 md4>
                <h1 class="title">Banajar 1:</h1>
                <h1 class="mb-3 headline primary--text">COLLECTIONS</h1>
              </v-flex>
              <v-flex xs4 sm 4 md4>
                <h1 class="title">Banajar 1:</h1>
                <h1 class="mb-3 headline primary--text">PICKUPS</h1>
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
            <p>Pickups for Pererenan are scheduled as follow:</p>
            <v-container fluid grid-list-xl>
              <v-layout row>
                 <v-flex xs4 sm4 md4 style="align-self: center;">
                  <v-avatar slot="activator">
                    <img src="http://mph-bali.org/wp-content/uploads/2016/08/logo.png" alt="">
                  </v-avatar>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <p>firstlastname</p>
                  <p>roleatfacility</p>
                </v-flex>
            </v-layout>

          <v-flex xs12>
            <v-card>
              <v-card-text class="text-xs-center">
                <h1 class="title">Working Hours</h1>
                <bar-chart :height="300" :chart-data="recyclingEfficiency" :options="barChartOptions" />
              </v-card-text>
            </v-card>
            </v-flex>
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
            <h1 class="headline mt-2">PICKUP SCHEDULE</h1>
            <p>Pickups for Pererenan are scheduled as follow:</p>

            <h1 class="title">Banajar 1:</h1>
            <h1 class="mb-3 headline primary--text">Mon & Fri 9 AM</h1>

            <h1 class="title">Banajar 2:</h1>
            <h1 class="mb-3 headline primary--text">Tue & Thu 9 AM</h1>
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
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
     recyclingData: {
      labels: ['Compost', 'Material', 'Landfill'],
      datasets: [
          {
            label: 'Oragnic',
            backgroundColor: '#4a90e2',
            data: [65, 45, 60, 65, 52]
          },
        ]
      },
      barChartOptions: {
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }]
        }
      }
    }
  }
}
</script>

<style scoped>

.Made-Surname-Facilit {
  width: 132px;
  height: 42px;
  font-family: IBMPlexSans;
  font-size: 14px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  text-align: left;
  color: #393939;
}
.Made-Surname-Facilit .text-style-1 {
  font-size: 18px;
  font-weight: 600;
}

</style>


<!-- function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
} -->
