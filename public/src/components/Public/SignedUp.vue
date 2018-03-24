<template>
    <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 md8 offset-md2>
        <v-card>
          <v-card-text>
            <v-icon size="50px">thumb_up</v-icon>
            <p>Our Community Manager will get in touch with you in the next hours and come visit you to welcome you and start your subscription.</p>
            <v-btn color="primary" flat>Problem?</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      name: 'SignedUp'
    }
  }
}
</script>
