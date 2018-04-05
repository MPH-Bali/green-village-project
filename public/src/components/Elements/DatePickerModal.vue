<template>
  <v-dialog
    persistent
    v-model="show"
    lazy full-width
    width="290px"
    :return-value.sync="date">
    <slot name="activator" slot="activator" />
    <v-date-picker v-model="date">
      <v-spacer />
      <v-btn
        flat color="primary"
        @click="show = false">
        {{ $t('forms.cancel') }}
      </v-btn>
      <v-btn
        flat color="primary"
        @click="$emit('ok', date)">
        {{ $t('forms.ok') }}
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      date: null,
      show: true
    }
  }
}
</script>
