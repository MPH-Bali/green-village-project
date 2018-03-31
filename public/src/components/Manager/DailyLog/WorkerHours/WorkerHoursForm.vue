<template>
  <v-container fluid grid-list-lg >
    <navigation-header />
    <v-layout row wrap class='add-worker'>
      <v-flex xs12 sm6>
        <p class='title'>Worker name</p>
        <v-select solo flat :items="workers"
          @change="clearError"
          v-model="formData.worker"
          item-text="name"
          item-value="id"
          return-object
          label="" class='grey-select' />
      </v-flex>
      <v-flex xs12 sm6>
        <p class='title'>Notes</p>
        <v-text-field
          v-model="formData.notes"
          class='grey-select'
          solo flat
          name="input-1" />
      </v-flex>
      <v-flex xs12 sm6>
        <worker-hours-time-field
          @done="receiveTime" part="in"
          :editTime="formData.times.in" />
      </v-flex>
      <v-flex xs12 sm6>
        <worker-hours-time-field
          @done="receiveTime" part="out"
          :editTime="formData.times.out"/>
      </v-flex>

      <v-flex xs4>
        <div class="left bottom">
          <v-btn color="error" @click="$router.go(-1)">Cancel</v-btn>
        </div>
      </v-flex>
      <v-flex xs4 class="center">
        <span class="title">Total Hours</span>
        <p class="total-hours">{{getTotalTime}} Hours</p>
      </v-flex>
      <v-flex xs4 class="right bottom">
        <v-btn color="success" @click="save" :disabled="error.show">Save</v-btn>
      </v-flex>
    </v-layout>
    <v-alert type="error" :value="error.show" class='full-width'>{{ error.msg }}</v-alert>
  </v-container>
</template>

<script>
export default {
  props: {
    id: { type: String, required: false }
  },
  async created () {
    if (this.id) {
      this.formData = await this.$firestore.get('workerhours', this.id)
    }
  },
  data () {
    return {
      error: {
        show: false,
        msg: ''
      },
      formData: {
        worker: null,
        notes: '',
        times: {
          in: null,
          out: null
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

      if (this.formData.times.in && this.formData.times.out) {
        const momentStart = this.$moment(this.formData.times.in)
        const momentEnd = this.$moment(this.formData.times.out)

        if (momentEnd < momentStart) {
          this.error = {
            show: true,
            msg: 'Time OUT must be greater then IN'
          }
          return 0
        }

        this.error = { show: false, msg: '' }
        const duration = this.$moment.duration(momentEnd.diff(momentStart))
        total += duration.asHours()
      }
      return Math.round(total)
    }
  },
  methods: {
    save () {
      this.formData.timestamp = new Date()

      if (!this.formData.worker) {
        this.error = {
          show: true,
          msg: 'You must select Worker'
        }
        return
      }

      if (!this.formData.times.in || !this.formData.times.out) {
        this.error = {
          show: true,
          msg: 'You must select both IN and OUT times'
        }
        return
      }

      this.$firestore.save('workerhours', this.formData).then(() => {
        this.$emit('message', {
          text: 'Worker hours saved',
          type: 'success'
        })
        this.$router.go(-1)
      })
    },
    receiveTime ({time, part}) {
      this.formData.times[part] = time
    },
    clearError () {
      this.error = {
        show: false,
        msg: ''
      }
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

.bottom {
  margin-top: 5vw;
}
</style>
