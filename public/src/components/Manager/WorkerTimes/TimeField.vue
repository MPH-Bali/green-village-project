<template>
  <v-dialog
    ref="dialog"
    persistent
    v-model="modal"
    lazy
    full-width
    width="290px"
    :return-value.sync="time">
    <v-text-field
      class='grey-select' 
      slot="activator"
      v-model="time"
      solo flat 
      readonly>
    </v-text-field>
    <v-time-picker v-model="time" actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
      <v-btn flat color="primary" @click="setTime(time)">OK</v-btn>
    </v-time-picker>
  </v-dialog>
</template>

<script>
export default {
  props: {
    part: {
      type: Object,
      default: {
        daytime: null,
        part: null
      }
    },
    inputTime: {
      type: Date,
      default: null
    }
  },
  data () {
    return {
      modal: false,
      time: null
    }
  },
  methods: {
    setTime (time) {
      const interval = this.part
      this.$refs.dialog.save(time)

      const now = this.$moment().format('YYYY-MM-DD')
      const returnTime = this.$moment(now + 'T' + time).toDate()

      this.$emit('done', { time: returnTime, interval })
    }
  },
  watch: {
    inputTime (time) {
      this.time = this.$moment(this.inputTime).format('HH:MM')
    }
  }
}
</script>

<style scoped>
.grey-select {
  background-color: rgba(66, 133, 61, 0.1)!important;
}
</style>
