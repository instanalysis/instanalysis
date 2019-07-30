<template>
	<canvas id="emotionsChart" width="100" height="100"></canvas>
</template>

<script>
const Chart = require('chart.js');
// import 'chartjs-plugin-labels';

export default {
  props: ['emotions'],
	methods: {
		initEmotionsChart() {
      new Chart(document.getElementById('emotionsChart'), {
        type: 'pie',
        data: {
          labels: Object.keys(this.emotions),
          datasets: [
            {
              label: `Values`,
              fill: true,
              backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#9db3d2", "#fdd074", "#455a63", "#b7e3e2", "#beaed6", "#e96775"],
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: Object.values(this.emotions).map(num => Math.round(num))
            }
          ]
        },
        options: {
          title: { display: true },
        }
      });
    }
	},
	mounted() {
		this.initEmotionsChart();
  },
}
</script>

<style>

</style>
