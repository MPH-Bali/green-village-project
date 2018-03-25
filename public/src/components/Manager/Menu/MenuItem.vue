<template>
  <v-layout layout row>
    <v-flex xs12 sm3 v-if="left">
    </v-flex>
    <v-flex xs12 sm9>
      <v-btn
      large
      color="blue-grey"
      @click="click"
      class="white--text menu-item">
        {{ name }}
      </v-btn>
    </v-flex>
    <v-flex xs12 sm3 v-if="!left">
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['name', 'position', 'icon', 'path'],
  computed: {
    left () {
      return this.position % 2 === 0
    }
  },
  methods: {
    click () {
      this.$router.push(this.path)
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.menu-item {
  width: 250px!important;
}
</style>