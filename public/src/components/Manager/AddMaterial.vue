<template>
  <v-container fluid grid-list-lg >
    <navigation-header />
    <v-data-table :items='materials' :headers='headers' hide-actions>
      <template slot='headers' slot-scope="props">
        <tr class='material-header'>
          <th v-for='header in props.headers' :key="header.text">
          {{ header.text }}
          </th>
        </tr>
        <tr class='material-actions'>
          <th style="width: 30%;">
            <v-select solo flat :items="workers" 
              v-model="formData.worker"
              item-text="name" 
              item-value="id"
              return-object
              label="" class='grey-select banjar' />
          </th>
          <th style="width: 12.5%;">
            <v-text-field
              v-model="formData.inorganic"
              class='grey-select red' 
              type="number"
              solo flat
              name="input-1"></v-text-field>
          </th>
          <th style="width: 12.5%;">
            <v-text-field
              v-model="formData.organic"
              type="number" 
              class='grey-select green' 
              solo flat 
              name="input-1"></v-text-field>
          </th>
          <th style="width: 30%">
            <v-select solo flat :items="banjars" 
              v-model="formData.banjar"
              item-text="name" label="" 
              item-value="id" return-object
              class='grey-select banjar'  />
          </th>
          <th style="width: 15%">
            <v-btn style="text-transform: capitalize" depressed color="primary" @click.stop="save">Save</v-btn>
          </th>
        </tr>
        <tr>
        <th colspan="5" v-show="error" @click="hideError">
          <v-alert type="error" :value="true">
            {{ error }}
          </v-alert>
        </th>
        </tr>
      </template>
      <template slot='items' slot-scope='props'>
        <td>{{ props.item.worker.name }}</td>
        <td>{{ props.item.inorganic }}</td>
        <td>{{ props.item.organic }}</td>
        <td>
          <template v-if="props.item.banjar">
            {{ props.item.banjar.name }}
          </template>
        </td>
        <td class="align-right" @click="editMaterial(props.item)"><v-icon small>fas fa-pencil-alt</v-icon></td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import NavigationHeader from '@/elements/NavigationHeader'
const defaultForm = {
  inorganic: '',
  organic: '',
  worker: null,
  banjar: null
}

export default {
  components: {
    NavigationHeader
  },
  computed: {
    workers () {
      return this.$firestore.collections.person.filter((person) => person.type && person.type.employee)
    },
    banjars () {
      return this.$firestore.collections.banjar
    },
    materials () {
      return this.$firestore.dailyCollections.material
    }
  },
  methods: {
    save () {
      if (!this.formData.worker) {
        this.error = 'You have to select a worker to save'
      } else {
        this.setWeights()
        if (this.formData.id) {
          this.updateMaterial()
        } else {
          this.newMaterial()
        }
        this.clearForm()
      }
    },
    newMaterial () {
      const payload = {
        worker: this.formData.worker,
        organic: parseInt(this.formData.organic),
        inorganic: parseInt(this.formData.inorganic),
        banjar: this.formData.banjar,
        timestamp: new Date()
      }
      this.$firestore.add('material', payload)
    },
    updateMaterial () {
      this.$firestore.update('material', this.formData)
    },
    hideError () {
      this.error = ''
    },
    setWeights () {
      if (this.formData.organic === '') {
        this.formData.organic = 0
      }
      if (this.formData.inorganic === '') {
        this.formData.inorganic = 0
      }
    },
    clearForm () {
      this.formData = defaultForm
    },
    editMaterial (material) {
      this.formData = {...material}
    }
  },
  data () {
    return {
      formData: defaultForm,
      error: '',
      headers: [
        { text: 'Worker', value: 'worker', align: 'left' },
        { text: 'Inorganic', value: 'inorganic', align: 'left' },
        { text: 'Organic', value: 'organic', align: 'left' },
        { text: 'Banjar', value: 'banjar', align: 'left' }
      ]
    }
  }
}
</script>

<style scoped>

.red {
  border: 1px solid #d0021b!important;
}

.green {
  border: 1px solid #7ed321!important;
}

.material-header {
  border-bottom: none!important;
  background-color: white;
}


.material-header th {
  text-align: left;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.13;
  letter-spacing: normal;
}

.material-actions th {
  padding: 0 10px!important;
  background-color: white;
}

.grey-select {
  background-color: rgba(66, 133, 61, 0.1)!important;
}

.grey-select div {
  padding: 3px 3px!important;
}

.worker-id {
  font-weight: bold;
}

.align-right {
  text-align: right;
}
</style>
