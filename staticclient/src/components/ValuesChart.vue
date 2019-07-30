<template>
	<canvas id="valuesChart" width="100" height="100"></canvas>
</template>

<script>
const Chart = require('chart.js');

export default {
  props: ['values'],
	data() {
		return {
			user: {
				values: [
					{
						"trait_id": "value_conservation",
						"name": "Conservation",
						"category": "values",
						"percentile": 0.02725197430081272,
						"raw_score": 0.5788270358763885,
						"significant": true
					},
					{
						"trait_id": "value_openness_to_change",
						"name": "Openness to change",
						"category": "values",
						"percentile": 0.6854512392944407,
						"raw_score": 0.802893150166668,
						"significant": true
					},
					{
						"trait_id": "value_hedonism",
						"name": "Hedonism",
						"category": "values",
						"percentile": 0.3754754766311752,
						"raw_score": 0.7179126880024099,
						"significant": true
					},
					{
						"trait_id": "value_self_enhancement",
						"name": "Self-enhancement",
						"category": "values",
						"percentile": 0.6890067278325013,
						"raw_score": 0.7279615134117968,
						"significant": true
					},
					{
						"trait_id": "value_self_transcendence",
						"name": "Self-transcendence",
						"category": "values",
						"percentile": 0.05015001965356963,
						"raw_score": 0.8061915042752282,
						"significant": true
					}
				],
			}
		}
	},
	methods: {
		initValuesChart() {
      new Chart(document.getElementById('valuesChart'), {
        type: 'doughnut',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: `Values`,
              fill: true,
              backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: this.chartData,
            }
          ]
        },
        options: {
          title: { display: true }
        }
      });
    },
	},
	mounted() {
		this.initValuesChart();
	},
	computed: {
		chartData() {
			return [
				this.values.value_self_transcendence,
				this.values.value_openness_to_change,
				this.values.value_self_enhancement,
				this.values.value_conservation,
				this.values.value_hedonism,
			];
		},
		labels() {
			return ['Helping Others','Exploration','Achievement','Tradition','Hedonism'];
		}
	}
}
</script>

<style>

</style>
