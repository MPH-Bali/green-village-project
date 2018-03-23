<script>
  import VueCharts from 'vue-chartjs'
  import { Bar } from 'vue-chartjs'

  export default {
  extends: Bar,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: '',
          backgroundColor: '#f87979',
          data: []
        }
      ]
    })
  }
}
</script>
