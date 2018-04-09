<template>
  <v-layout row wrap>
    <v-flex xs7>
      <v-select solo flat :items="hours" v-model="time" class="accent" />
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
  props: {
    value: { type: Date, required: false }
  },
  watch: {
    postfix: 'update',
    time: 'update',
    value: {
      immediate: true,
      handler (value) {
        this.time = value ? moment(value).format('hh:mm A').split(' ')[0] : null
        this.postfix = value ? moment(value).format('hh:mm A').split(' ')[1] : 'AM'
      }
    }
  },
  data () {
    return {
      hours: [...Array(12).keys()].map(x => {
        return ((x + 1) + ':00').padStart(5, '0')
      }),
      time: null,
      postfix: 'AM'
    }
  },
  methods: {
    update () {
      const today = moment().format('YYYY-MM-DD')
      const timestamp = moment(today + ' ' + this.time + ' ' + this.postfix, 'YYYY-MM-DD hh:mm A')
      if (timestamp.isValid()) this.$emit('input', new Date(timestamp))
    }
  }
}
</script>
