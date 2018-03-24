<template>
  <v-container fluid grid-list-lg >
    <navigation-header />
    <v-data-table :items='items' :headers='headers' hide-actions>
      <template slot='headers' slot-scope="props">
        <tr class='material-header'> 
          <th v-for='header in props.headers'
          :key="header.text"
          >
          {{ header.text }}
          </th>
        </tr>
        <tr class='material-actions'>
          <th style="width: 30%;">
            <v-select solo flat :items="['Putu', 'Kutu', 'Tutu']" label="" class='material-select banjar' />
          </th>
          <th style="width: 10%;">
            <v-text-field
              class='material-select' 
              solo flat 
              name="input-1"></v-text-field>
          </th>
          <th style="width: 10%;">
            <v-text-field
                class='material-select' 
                solo flat 
                name="input-1"></v-text-field>
          </th>
          <th style="width: 30%">
            <v-select solo flat :items="['Putu', 'Kutu', 'Tutu']" label="" class='material-select banjar'  />
          </th>
          <th style="width: 20%">
            <v-btn style="text-transform: capitalize" depressed color="primary" @click.stop="save">Save</v-btn>
          </th>
        </tr>
      </template>
      <template slot='items' slot-scope='props'>
        <td><span class='worker-id'>0{{ props.item.id }}.</span> {{ props.item.worker }}</td>
        <td>{{ props.item.inorganic }}</td>
        <td>{{ props.item.organic }}</td>
        <td>{{ props.item.banjar }}</td>
        <td class="align-right"><v-icon small>fas fa-pencil-alt</v-icon></td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        timestamp: new Date(),
        items: [
          {
            id: 1,
            worker: 'Made',
            inorganic: '20kg',
            organic: '10kg',
            banjar: 'banjar 1'
          },
          {
            id: 2,
            worker: 'Made',
            inorganic: '20kg',
            organic: '10kg',
            banjar: 'banjar 1'
          },
          {
            id: 3,
            worker: 'Made',
            inorganic: '20kg',
            organic: '10kg',
            banjar: 'banjar 1'
          },
          {
            id: 4,
            worker: 'Made',
            inorganic: '20kg',
            organic: '10kg',
            banjar: 'banjar 1'
          }
        ],
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

.worker-id {
  font-weight: bold;
}

.align-right {
  text-align: right;
}
</style>