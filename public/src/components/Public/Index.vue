<template>
  <v-app>
    <v-toolbar flat class="elevation-1" app color="secondary" clipped-left>
      <v-toolbar-items class="ml-0">
        <v-btn flat color="primary" @click="$router.push('/manager')">
          <v-icon>fa-recycle</v-icon>
        </v-btn>
      </v-toolbar-items>
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

            <v-flex xs12 my-2>
              <v-card class="py-5 bg">
                <h1 class="display-2 white--text">WELCOME</h1>
                <h2 class="subheading white--text">Pererenan Facility</h2>
              </v-card>
            </v-flex>

            <v-flex xs12 my-2 color="white" elevation-2 py-3 px-4>
              <v-avatar color="grey lighten-2" size="80px">
                <v-icon size="50px">group</v-icon>
              </v-avatar>
              <h1 class="headline mt-2">MEMBERS</h1>
              <p>We’re already a lot, but we want all 805 Pererenan households to join us!</p>
              <v-progress-linear value="75" height="20" color="primary" />
              <v-btn color="primary" flat>Share</v-btn>
              <v-btn color="primary" depressed>Join Us</v-btn>
            </v-flex>

            <v-flex xs12 my-2 color="white" elevation-2 py-3>
              <v-avatar color="grey lighten-2" size="80px">
                <v-icon size="50px">dashboard</v-icon>
              </v-avatar>
              <h1 class="headline mt-2">PERERENAN</h1>
              <h1 class="headline">FACILITY DATA</h1>
            </v-flex>

            <v-flex xs12 mt-2 class="grey darken-3 white--text">
              <p class="body-1 my-3">Contact Us</p>
              <p class="body-1 my-3">Send Feedback</p>
              <p class="body-1 my-3">Contribute</p>
              <p class="body-1 my-3">FAQ</p>
              <p class="body-1 my-3">Credits</p>
            </v-flex>

          </v-layout>
        </v-flex>
      </v-layout>

    </v-content>
  </v-app>
</template>

<script>
export default {

}
</script>

<style>
  .bg {
    background-image: url('https://cdn.acodez.in/wp-content/uploads/2015/09/blurred-background-image-for-web-design.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }
</style>
