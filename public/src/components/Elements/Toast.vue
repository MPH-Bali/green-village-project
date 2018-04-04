<template>
  <div>
    <v-snackbar
      :bottom="true"
      v-model="show"
      :timeout="2000"
      :color="message.type">
     {{ message.text }}
   </v-snackbar>
  </div>
</template>

<script>
import ding from '@/../static/ding.mp3'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      show: false,
      text: ''
    }
  },
  watch: {
    message (newMessage) {
      if (!newMessage.text) return
      this.show = true
      if (newMessage.type === 'success' && newMessage.ding) {
        this.playDing()
        window.navigator.vibrate(1000)
      }
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
