

<script>
  import VueCharts from 'vue-chartjs'
  import { Line } from 'vue-chartjs'

  export default {
  extends: Line,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
        {
          label: '',
          backgroundColor: '#f87979',
          data: []
        }
      ]
    })
  }

  methods: {
    addData: function(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
    }
  }
}
</script>
