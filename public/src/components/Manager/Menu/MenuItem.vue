<template>
  <v-layout layout row>
    <v-flex hidden-xs-only sm3 v-if="left">
    </v-flex>
    <v-flex xs12 sm9 class='menu-item-container'>
      <v-btn
      large
      color="blue-grey"
      @click="click"
      :disabled="disabled"
      class="white--text menu-item">
        {{ name }}
      </v-btn>
    </v-flex>
    <v-flex hidden-xs-only sm3 v-if="!left">
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['name', 'position', 'icon', 'path', 'disabled'],
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
.menu-item-container {
  text-align: center;
}
.menu-item {
  width: 250px!important;
}
</style>