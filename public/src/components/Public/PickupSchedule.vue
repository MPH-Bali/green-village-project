<template>
   <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-avatar color="grey lighten-2" size="80px">
              <v-icon size="50px">assignment_turned_in</v-icon>
            </v-avatar>
            <h1 class="headline mt-2">PICKUP SCHEDULE</h1>
            <p>Pickups for Pererenan are scheduled as follow:</p>

            <h1 class="title">Banajar 1:</h1>
            <h1 class="mb-3 headline primary--text">Mon & Fri 9 AM</h1>

            <h1 class="title">Banajar 2:</h1>
            <h1 class="mb-3 headline primary--text">Tue & Thu 9 AM</h1>
          </v-card-text>
        </v-card>
      </v-flex>
</template>

<script>
export default {
  data () {
    return {
      name: 'PickupSchedule'
    }
  }
}
</script>
