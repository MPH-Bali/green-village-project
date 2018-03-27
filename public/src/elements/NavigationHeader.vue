<template>
  <v-layout row wrap my-2 align-center>
    <v-flex xs2 text-xs-left pt-0>
      <v-btn flat class="mt-1" @click="$router.go(-1)">
        <v-icon small color="blue darken-2">arrow_back</v-icon>
        <span class="ml-1">{{ $t('common.back') }}</span>
      </v-btn>
    </v-flex>
    <v-flex xs8 text-xs-center>
      <p class="title">
        <v-icon color="primary">event</v-icon>
        <span>{{ $moment().format('ddd, DD MMM YYYY') }}</span>
      </p>
    </v-flex>
    <v-flex xs2>
      <slot name="right"></slot>
    </v-flex>
  </v-layout>
</template>
