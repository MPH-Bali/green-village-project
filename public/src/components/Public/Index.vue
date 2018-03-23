<template>
  <v-app>
    <v-toolbar flat class="elevation-1" app color="secondary" clipped-left>
      <v-toolbar-items class="ml-0">
        <v-btn flat color="primary" @click="$router.push('/manager')">
          <v-icon>fa-recycle</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-title>Pererenan</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="mr-0">
        <v-btn flat>
          <v-icon size="30px">menu</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>

      <v-layout>
        <v-flex row wrap xs12 md8 offset-md2 lg6 offset-lg3 text-xs-center>
          <v-layout row wrap>
            <v-slide-y-transition mode="out-in">
              <router-view />
            </v-slide-y-transition>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout row wrap text-xs-center>
        <v-flex xs12 style="background: linear-gradient(#fafafa 50%, #424242 50%)">
          <v-btn class="mx-3" icon color="accent">
            <v-icon color="primary">fab fa-facebook</v-icon>
          </v-btn>
          <v-btn class="mx-3" icon color="accent">
            <v-icon color="primary">fab fa-twitter</v-icon>
          </v-btn>
          <v-btn class="mx-3" icon color="accent">
            <v-icon color="primary">fab fa-google-plus</v-icon>
          </v-btn>
          <v-btn class="mx-3" icon color="accent">
            <v-icon color="primary">fab fa-whatsapp</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 class="grey darken-3 white--text">
          <p class="body-1 my-3">Contact Us</p>
          <p class="body-1 my-3">Send Feedback</p>
          <p class="body-1 my-3">Contribute</p>
          <p class="body-1 my-3">FAQ</p>
          <p class="body-1 my-3">Credits</p>
        </v-flex>
      </v-layout>

    </v-content>
  </v-app>
</template>
