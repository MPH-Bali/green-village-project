<template>
<v-layout row wrap>
  <v-flex xs12>
    <p>{{ value }}</p>
  </v-flex>
  <v-flex xs7>
    <v-select solo flat :items="hours" :value="time" @change="updateTime()" class="accent" />
  </v-flex>
  <v-flex xs5>
  <v-btn-toggle mandatory class="elevation-0" v-model="postfix">
    <v-btn outline large class="primary--text px-3" value="AM">AM</v-btn>
    <v-btn outline large class="primary--text px-3" value="PM">PM</v-btn>
  </v-btn-toggle>
  </v-flex>
</v-layout>

</template>

<script>
import moment from 'moment'
export default {
  props: ['value'],
  computed: {
    hours () {
      return [...Array(12).keys()].map(x => {
        return ((x + 1) + ':00').padStart(5, '0')
      })
    },
    time () {
      return this.value ? moment(this.value).format('hh:mm A').split(' ')[0] : null
    },
    postfix () {
      return this.value ? moment(this.value).format('hh:mm A').split(' ')[1] : 'AM'
    }
  },
  methods: {
    updateTime () {
      const today = moment().format('YYYY-MM-DD')
      const timestamp = moment(today + ' ' + this.time + ' ' + this.postfix, 'YYYY-MM-DD hh:mm A')
      if (timestamp.isValid()) this.$emit('input', new Date(timestamp))
    }
  }
}
</script>
