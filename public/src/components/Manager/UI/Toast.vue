<template>
  <div>
    <v-snackbar :bottom="true"
                v-model="show"
                :timeout="2000"
                :color="type">
     {{ message }}
   </v-snackbar>
  </div>
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
      window.navigator.vibrate(1000)
    }
  },
  methods: {
    playDing () {
      this.$options.ding.play()
    }
  },
  mounted () {
    this.$options.ding = new Audio(ding)
  }
}
</script>

<style scoped>

</style>
