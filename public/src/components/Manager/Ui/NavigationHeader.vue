<template>
  <v-layout row wrap>  
    <v-flex xs4 >
      <v-flex xs12 text-xs-center pt-4>
      <p class='left'>
        <slot name="left">
          <v-icon small color="blue darken-2">fas fa-arrow-left</v-icon> Back
        </slot>
      </p>
      </v-flex>
    </v-flex>
    <v-flex xs4 >
      <v-flex xs12 text-xs-center pt-4>
        <p>
          <v-icon color="primary">event</v-icon>
          <span>{{ $moment(timestamp).format('ddd, DD MMM YYYY') }}</span>
        </p>
      </v-flex>
    </v-flex>
    <v-flex xs4 >
      <slot name="right">
      </slot>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        timestamp: new Date()
      }
    }
  }
</script>

<style>
.left {
  text-align: left;
}
</style>