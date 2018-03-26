<template>
  <v-container fluid grid-list-lg >
    <navigation-header />
    <v-layout row wrap>
      <v-flex xs12 sm3>
        <p class='title'>Type</p>
        <v-select solo flat :items="settings" 
                v-model="formData.type"
                @change="clearError"
                return-object
                label="" class='grey-select' />
      </v-flex>
      <v-flex xs12 sm3>
        <p class='title'>Cost IDR</p>
        <v-text-field
                class='grey-select'  
                type='number'
                @keyup="clearError"
                v-model="formData.cost"
                solo flat 
                name="input-1">
        </v-text-field>
      </v-flex>
      <v-flex xs12 sm4>
        <p class='title'>Notes</p>
        <v-text-field
                class='grey-select' 
                v-model="formData.notes"
                solo flat 
                name="input-1">
        </v-text-field>
      </v-flex>
      <v-flex xs12 sm2>
        <p class='title'>&nbsp;</p>
        <v-btn @click="save" :disabled="error.show" color="success">Save</v-btn>
      </v-flex>
    </v-layout>
    <v-alert type="error" :value="error.show" class='full-width'>{{ error.msg }}</v-alert>
  </v-container>
</template>

<script>
import NavigationHeader from '@/elements/NavigationHeader'
export default {
  components: {
    NavigationHeader
  },
  async created () {
    if (this.id) {
      this.formData = await this.$firestore.get('workerhours', this.id)
    }
  },
  data () {
    return {
      error: {
        show: false,
        msg: ''
      },
      formData: {
        type: '',
        cost: '',
        notes: ''
      }
    }
  },
  computed: {
    settings () {
      const loaded = this.$firestore.collections.settings
      if (loaded[0]) {
        return loaded[0].expenseTypes
      }
      return []
    }
  },
  methods: {
    save () {
      if (!this.formData.type) {
        this.error = {
          show: true,
          msg: 'You need to select expense type'
        }
        return
      }

      if (!this.formData.cost) {
        this.error = {
          show: true,
          msg: 'You need to specify expense cost'
        }
        return
      }

      this.formData.cost = parseInt(this.formData.cost)
      this.formData.timestamp = new Date()

      this.$firestore.save('expense', this.formData).then(() => {
        this.$emit('message', {
          text: 'Expense saved',
          type: 'success'
        })
        this.$router.go(-1)
      })
    },
    clearError () {
      this.error = {
        show: false,
        msg: ''
      }
    }
  }
}
</script>

<style scoped>
.grey-select {
  background-color: rgba(66, 133, 61, 0.1)!important;
}
</style>