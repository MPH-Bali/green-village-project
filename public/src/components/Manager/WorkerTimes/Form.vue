<template>
  <v-container fluid grid-list-lg >
    <navigation-header />
    <v-layout row wrap class='add-worker'>
      <v-flex xs12 sm6>
        <p class='subheading'>Worker name</p>
        <v-select solo flat :items="workers" 
                v-model="formData.worker"
                item-text="name" 
                item-value="id"
                return-object
                label="" class='grey-select banjar' />

        <div class='devider-container'>
          <div class='devider subheadingfont'><span>Morning</span></div>
        </div>

        <v-layout row wrap>
          <v-flex xs6 >
            <p class='subheading'>In</p>
            <TimeField @done="receiveTime" :part="setPart('morning','start')"  />
          </v-flex>
          <v-flex xs6 >
            <p class='subheading'>Out</p>
            <TimeField @done="receiveTime" :part="setPart('morning','end')"  />
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12 sm6>
        <p class='subheading'>Notes</p>
        <v-text-field
                v-model="formData.notes"
                class='grey-select' 
                solo flat 
                name="input-1"></v-text-field>

        <div class='devider-container'>
          <div class='devider subheadingfont'><span>Afternoon</span></div>
        </div>

        <v-layout row wrap>
          <v-flex xs6 >
            <p class='subheading'>In</p>
            <TimeField @done="receiveTime" :part="setPart('afternoon','start')" />
          </v-flex>
          <v-flex xs6 >
            <p class='subheading'>Out</p>
            <TimeField @done="receiveTime" :part="setPart('afternoon','end')" />
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs4>
        <div class="left">
          <v-btn color="error">Cancel</v-btn>
        </div>
      </v-flex>
      <v-flex xs4 class="center">
        <span class="title">Total Hours</span>
        <p class="total-hours">{{getTotalTime}} Hours</p>
      </v-flex>
      <v-flex xs4 class="right">
        <v-btn color="success" @click="save">Save</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import NavigationHeader from '@/elements/NavigationHeader'
import TimeField from './TimeField'

export default {
  components: {
    TimeField, NavigationHeader
  },
  data () {
    return {
      modal2: false,
      returntime: null,
      formData: {
        worker: null,
        notes: '',
        times: {
          morning: {
            start: null,
            end: null
          },
          afternoon: {
            start: null,
            end: null
          }
        }
      },
      pickedTime: {
        morning: {
          start: null,
          end: null
        },
        afternoon: {
          start: null,
          end: null
        }
      }
    }
  },
  computed: {
    workers () {
      return this.$firestore.collections.person.filter((person) => person.type && person.type.employee)
    },
    getTotalTime () {
      let total = 0
      if (this.pickedTime.morning.start && this.pickedTime.morning.end) {
        const now = this.$moment().format('YYYY-MM-DD')

        const start = this.$moment(now + 'T' + this.pickedTime.morning.start)
        const end = this.$moment(now + 'T' + this.pickedTime.morning.end)

        this.formData.times.morning.start = start.toDate()
        this.formData.times.morning.end = end.toDate()

        const duration = this.$moment.duration(end.diff(start))
        total += duration.asHours()
      }
      if (this.pickedTime.afternoon.start && this.pickedTime.afternoon.end) {
        const now = this.$moment().format('YYYY-MM-DD')

        const start = this.$moment(now + 'T' + this.pickedTime.afternoon.start)
        const end = this.$moment(now + 'T' + this.pickedTime.afternoon.end)

        this.formData.times.afternoon.start = start.toDate()
        this.formData.times.afternoon.end = end.toDate()

        const duration = this.$moment.duration(end.diff(start))
        total += duration.asHours()
      }
      return Math.round(total)
    }
  },
  methods: {
    save () {
      this.formData.timestamp = new Date()
      this.$firestore.add('workertimes', this.formData).then(() => {
        this.$router.go(-1)
      })
    },
    receiveTime ({time, interval}) {
      const { daytime, part } = interval
      this.pickedTime[daytime][part] = time
    },
    setPart (daytime, part) {
      return { daytime, part }
    }
  }
}
</script>

<style scoped>
.total-hours {
  font-size: 28px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.25;
  letter-spacing: normal;
  color: #152935;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
}

.center {
  text-align: center;
}

.subheading {
  margin-bottom: 0px!important;
}

.add-worker {
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
}
.grey-select {
  background-color: rgba(66, 133, 61, 0.1)!important;
}

.separator {
  text-align: center;
  width: 100%;
  margin-top: -40px;
}

.devider-container {
  padding-top: 3vw;
}

.devider{
  text-align: center;
  border-bottom: 1px solid #ecf2eb; 
  line-height: 0.1em;
  margin: 10px 0 20px; 
}

.devider span{
  background-color: white;
  color: #152935;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  padding-left: 5px;
  padding-right: 5px;
}
</style>