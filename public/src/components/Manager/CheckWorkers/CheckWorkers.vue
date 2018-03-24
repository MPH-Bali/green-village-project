<template>
  <v-container fluid grid-list-lg >
    <navigation-header />
    <AddWorker />
  </v-container>

</template>

<script>
import NavigationHeader from '../Ui/NavigationHeader'
import AddWorker from './AddWorker'
export default {
  components: {
    NavigationHeader, AddWorker
  },
  data () {
    return {}
  }
}
</script>