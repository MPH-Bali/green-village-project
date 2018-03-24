<template>
  <v-layout row>
    <v-flex xs12 md6 offset-md3>
      <v-container fluid grid-list-lg v-if="form">
        <v-layout row wrap>
          <v-flex xs12 text-xs-center pt-4>
            <p class="title">
              <v-icon color="primary">event</v-icon>
              <span>{{ $moment().format('ddd, DD MMM YYYY') }}</span>
            </p>
          </v-flex>
          <v-flex xs6>
            <p class="body-2 mb-1">Driver</p>
            <v-select
              solo flat class="accent"
              label="Pick a driver name"
              :items="$firestore.collections.person.filter(p => p.type && p.type.employee)"
              item-value="id"
              item-text="name"
              return-object
              v-model="form.driver" />
          </v-flex>
          <v-flex xs6>
            <p class="body-2 mb-1">Banjar</p>
            <v-select
              solo flat class="accent"
              label="Select one ore more Banjars"
              :items="$firestore.collections.banjar"
              item-value="id"
              item-text="name"
              return-object
              v-model="form.banjar" />
          </v-flex>
          <v-flex xs6>
            <p class="body-2 mb-1">Oragnic</p>
            <v-text-field
              solo flat class="accent"
              suffix="kg"
              type="number" min="0"
              v-model="form.organic" />
          </v-flex>
          <v-flex xs6>
            <p class="body-2 mb-1">Anoragnic</p>
            <v-text-field
              solo flat class="accent"
              suffix="kg"
              type="number" min="0"
              v-model="form.anorganic" />
          </v-flex>
          <v-flex xs3>
            <p class="body-2 mb-1">#villas</p>
            <v-text-field
              solo flat class="accent"
              type="number" min="0"
              v-model="form.villas" />
          </v-flex>
          <v-flex xs3>
            <p class="body-2 mb-1">#households</p>
            <v-text-field
              solo flat class="accent"
              type="number" min="0"
              v-model="form.households" />
          </v-flex>
          <v-flex xs3>
            <p class="body-2 mb-1">#businesses</p>
            <v-text-field
              solo flat class="accent"
              type="number" min="0"
              v-model="form.businesses" />
          </v-flex>
          <v-flex xs3>
            <p class="body-2 mb-1">#facilities</p>
            <v-text-field
              solo flat class="accent"
              type="number" min="0"
              v-model="form.facilities" />
          </v-flex>
          <v-flex xs12>
            <p class="body-2 mb-1">Comments</p>
            <v-text-field
              solo flat class="accent"
              auto-grow multi-line
              v-model="form.comments"/>
          </v-flex>
          <v-flex xs6>
            <v-btn color="error" flat outline @click.stop="$router.go(-1)">Cancel</v-btn>
          </v-flex>
          <v-flex xs6 text-xs-right>
            <v-btn @click.stop="save"
              :disabled="!valid"
              style="text-transform: capitalize"
              depressed
              color="primary"
              :loading="savePending">
              Save Delivery
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>

  </v-layout>
</template>

<script>
export default {
  props: {
    id: { type: String, required: false }
  },
  async created () {
    if (this.id) {
      this.fetchingDelivery = true
      this.form = await this.$firestore.get('delivery', this.id)
      this.fetchingDelivery = false
    }
  },
  computed: {
    valid () {
      return this.form.banjar && this.form.driver
    }
  },
  data () {
    return {
      form: {
        organic: 0,
        anorganic: 0,
        households: 0,
        villas: 0,
        businesses: 0,
        facilities: 0,
        timestamp: new Date()
      },
      savePending: false,
      fetchingDelivery: false
    }
  },
  methods: {
    async save () {
      this.savePending = true
      await this.$firestore.save('delivery', this.form)
      this.$router.go(-1)
    }
  }
}
</script>
