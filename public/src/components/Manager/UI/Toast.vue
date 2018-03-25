<template>
  <v-snackbar :bottom="true"
              v-model="show"
              :timeout="2000"
              :color="type">
   {{ message }}
 </v-snackbar>
</template>

<script>
import ding from '@/../static/ding.mp3'

export default {
  props: {
    message: {
      type: String
    },
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: false,
      text: ''
    }
  },
  watch: {
    message (newVal) {
      if (!newVal) return
      this.message = newVal
      this.show = true
      if (this.type === 'success') this.playDing()
    }
  },
  methods: {
    playDing () {
      this.$options.audio.play()
    }
  },
  created () {
    this.$options.audio = new Audio(ding)
  }
}
</script>

<style scoped>

</style>
