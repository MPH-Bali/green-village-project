<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 md8 offset-md2>
        <v-card>
          <v-card-text>
            <v-avatar color="grey lighten-2" size="80px">
              <v-icon size="50px">thumb_up</v-icon>
            </v-avatar>
            <h1 class="headline mt-2">JOIN MPH PERERENAN</h1>
            <p class="body-1">Fill in your details to join the MPH program and get your rubbish collected.</p>

            <v-form>
              <v-text-field label="Write your Full Name" flat v-model="form.name" />
              <v-text-field label="Email" flat v-model="form.email" />
              <v-text-field label="SMS & Call Phone" flat v-model="form.sms" />
              <v-text-field label="Whatsapp" flat v-model="form.whatsapp" />
              <v-select flat :items="['Houshold', 'Villa', 'Business']" label="Houshold, Villa or Business" v-model="form.type" />
            </v-form>

            <p class="caption">Our Community Manager will come to your place to collect the fee and finalise your subscription</p>
            <v-btn color="primary" flat>Problem?</v-btn>
            <v-btn v-on:click="addClient"color="primary" depressed>Join Us</v-btn>
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
      form: {}
    }
  },
  methods: {
    addClient: function(){
      alert('Hello ' + this.form.name + '!')
    }
  }
}
</script>
