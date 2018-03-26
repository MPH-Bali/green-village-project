<template>
  <v-layout row mb-3>
    <v-flex pt-3 pl-3>
      <p class="title">{{ title }}</p>
    </v-flex>
    <v-flex text-xs-right>
      <v-btn depressed color="primary" @click.stop="$router.push(action)">
        <v-icon>add_circle</v-icon>
        <span style="text-transform: capitalize" class="ml-2">{{ $t('common.add') }}</span>
      </v-btn>
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
