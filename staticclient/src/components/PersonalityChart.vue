<template>
	<canvas id="personalityChart" width="100" height="100" style="display: unset;"></canvas>
</template>

<script>
const Chart = require('chart.js');

export default {
  props: ['personality'],
	methods: {
		initPersonalityChart() {
      new Chart(document.getElementById('personalityChart'), {
        type: 'radar',
        data: {
          labels: this.labels,
          datasets: [
            {
              fill: true,
              backgroundColor: "rgba(111,148,205,0.7)",
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: Object.values(this.personality),
            }
          ]
				},
				options: {
         legend: {
            display: false
         },
				},
      });
    },
	},
	mounted() {
		this.initPersonalityChart();
	},
	computed: {
		labels() {
			return Object.keys(this.personality).map(id => {
				if(id === 'big5_openness') return 'Openess';
				if(id === 'big5_extraversion') return 'Extraversion';
				if(id === 'big5_agreeableness') return 'Agreeableness';
				if(id === 'big5_conscientiousness') return 'Orderliness';
				if(id === 'big5_neuroticism') return 'Neuroticism';
			})
		}
	}
}
</script>

<style>

</style>
