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
              v-model="formdata.worker"
              item-text="name"
              item-value="id"
              return-object
              label="" class='material-select banjar' />
          </th>
          <th style="width: 12.5%;">
            <v-text-field
              v-model="formdata.inorganic"
              class='material-select red'
              type="number"
              solo flat
              name="input-1"></v-text-field>
          </th>
          <th style="width: 12.5%;">
            <v-text-field
              v-model="formdata.organic"
              type="number"
              class='material-select green'
              solo flat
              name="input-1"></v-text-field>
          </th>
          <th style="width: 30%">
            <v-select solo flat :items="banjars"
              v-model="formdata.banjar"
              item-text="name" label=""
              item-value="id" return-object
              class='material-select banjar'  />
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
const defaultForm = {
  inorganic: '',
  organic: '',
  worker: null,
  banjar: null
}

export default {
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
      if (!this.formdata.worker) {
        this.error = 'You have to select a worker to save'
      } else {
        this.setWeights()
        if (this.formdata.id) {
          this.updateMaterial()
        } else {
          this.newMaterial()
        }
        this.clearForm()
      }
    },
    newMaterial () {
      const payload = {
        worker: this.formdata.worker,
        organic: parseInt(this.formdata.organic),
        inorganic: parseInt(this.formdata.inorganic),
        banjar: this.formdata.banjar,
        timestamp: new Date()
      }
      this.$firestore.add('material', payload)
    },
    updateMaterial () {
      this.$firestore.update('material', this.formdata)
    },
    hideError () {
      this.error = ''
    },
    setWeights () {
      if (this.formdata.organic === '') {
        this.formdata.organic = 0
      }
      if (this.formdata.inorganic === '') {
        this.formdata.inorganic = 0
      }
    },
    clearForm () {
      this.formdata = defaultForm
    },
    editMaterial (material) {
      this.formdata = {...material}
    }
  },
  data () {
    return {
      formdata: defaultForm,
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
}

.material-select {
  background-color: rgba(66, 133, 61, 0.1)!important;
}

.material-select div {
  padding: 3px 3px!important;
}

.worker-id {
  font-weight: bold;
}

.align-right {
  text-align: right;
}
</style>
