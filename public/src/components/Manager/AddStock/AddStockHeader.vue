<template>
  <v-layout row mb-3>
    <v-flex pt-3 pl-3>
      <p class="title">{{ title }}</p>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    }
  },
  data () {
    return {
    }
  }
}
</script>
