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
    inpuTime: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      modal: false,
      time: this.inpuTime
    }
  },
  methods: {
    setTime (time) {
      const interval = this.part
      this.$refs.dialog.save(time)
      this.$emit('done', { time, interval })
    }
  }
}
</script>

<style scoped>
.grey-select {
  background-color: rgba(66, 133, 61, 0.1)!important;
}
</style>
