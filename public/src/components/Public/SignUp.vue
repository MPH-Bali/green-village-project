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
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field for="name" label="Write your Full Name" flat v-model="form.name" :rules="nameRules" required />
              <v-text-field label="Email" flat v-model="form.email" :rules="emailRules" required />
              <v-text-field label="SMS" flat v-model="form.sms" :rules="smsRules" required />
              <v-text-field label="Whatsapp" flat v-model="form.whatsapp" :rules="whatsappRules" required />
              <v-select flat :items="['Houshold', 'Villa', 'Business']" label="Item" v-model="form.type" :rules="[v => !!v || 'Item is required']"required />
            </v-form>
            <p class="caption">Our Community Manager will come to your place to collect the fee and finalise your subscription</p>
            <v-btn v-on:click="$router.push('/contact-us')" flat>Problem?</v-btn>
            <v-btn v-on:click="submit" :disabled="!valid" color="primary" type="submit" depressed>Join Us</v-btn>
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
      form: {},
      errors: [],
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length > 6) || 'Name must at least 6 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      SMS: '',
      smsRules: [
        v => !!v || 'Valid phone number required',
        v => /^\+(?:[0-9] ?){6,14}[0-9]$/.test(v) || 'Phone number must be valid'
      ],
      Whatsapp: '',
      whatsappRules: [
        v => !!v || 'Valid WhatsApp number required',
        v => /^\+(?:[0-9] ?){6,14}[0-9]$/.test(v) || 'WhatsApp must be valid'
      ],
      select: null
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.$router.push('/signed-up')
        this.$firestore.add('person', form)
      }
    }
  }
}
</script>
