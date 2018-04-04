<template>
  <v-layout row>
    <v-flex xs12 md6 offset-md3>
      <v-container fluid grid-list-lg v-if="form">
        <navigation-header />
        <v-layout row wrap>
          <v-flex xs6>
            <p class="body-2 mb-1">Driver</p>
            <v-select
              tabindex=1
              autofocus
              solo flat class="accent"
              label="Pick a driver name"
              :items="$store.person.data.filter(p => p.type && p.type.employee)"
              item-value="id"
              item-text="name"
              return-object
              v-model="form.driver" />
          </v-flex>
          <v-flex xs6>
            <p class="body-2 mb-1">Banjar</p>
            <v-select
              tabindex=2
              solo flat class="accent"
              label="Select one ore more Banjars"
              :items="$store.banjar.data"
              item-value="id"
              item-text="name"
              return-object
              v-model="form.banjar" />
          </v-flex>
          <v-flex xs3>
            <p class="body-2 mb-1">#villas</p>
            <v-text-field
              tabindex=3
              solo flat class="accent"
              type="number" min="0"
              v-model="form.villas" />
          </v-flex>
          <v-flex xs3>
            <p class="body-2 mb-1">#households</p>
            <v-text-field
              tabindex=4
              solo flat class="accent"
              type="number" min="0"
              v-model="form.households" />
          </v-flex>
          <v-flex xs3>
            <p class="body-2 mb-1">#businesses</p>
            <v-text-field
              tabindex=5
              solo flat class="accent"
              type="number" min="0"
              v-model="form.businesses" />
          </v-flex>
          <v-flex xs3>
            <p class="body-2 mb-1">#facilities</p>
            <v-text-field
              tabindex=6
              solo flat class="accent"
              type="number" min="0"
              v-model="form.facilities" />
          </v-flex>
          <v-flex xs12>
            <p class="body-2 mb-1">Comments</p>
            <v-text-field
              tabindex=7
              solo flat class="accent"
              auto-grow multi-line
              v-model="form.comments"/>
          </v-flex>
          <v-flex xs6>
            <v-btn
              tabindex=9
              color="error"
              flat outline
              @click.stop="$router.go(-1)">
              Cancel
            </v-btn>
          </v-flex>
          <v-flex xs6 text-xs-right>
            <v-btn @click.stop="save"
              tabindex=8
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
      this.form = await this.$store.delivery.collection.get(this.id)
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
      form: {},
      savePending: false,
      fetchingDelivery: false
    }
  },
  methods: {
    async save () {
      this.savePending = true
      await this.$store.delivery.collection.save({
        ...this.form,
        timestamp: this.form.timestamp || new Date(),
        households: parseInt(this.form.households || 0),
        villas: parseInt(this.form.villas || 0),
        businesses: parseInt(this.form.businesses || 0),
        facilities: parseInt(this.form.facilities || 0)
      })
      this.$emit('message', {
        text: 'Delivery saved',
        type: 'success',
        ding: true
      })
      this.$router.go(-1)
    }
  }
}
</script>
