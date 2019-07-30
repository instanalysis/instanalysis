<template>
  <div class="box" style="width: 100%; text-align: center; display: flex; ">
    <div class="sectionhead">
      <div class="heading">Personality</div>
    </div>
    <div style="width:100%">
      <canvas id="personalityChart_1" width="" height="" style="display: unset;"></canvas>
    </div>
    <div style="width:100%">
      <canvas id="personalityChart_2" width="" height="" style="display: unset;"></canvas>  
    </div>
  </div>
</template>

<script>
const Chart = require('chart.js');

export default {
  props: ['personalities'],
	methods: {
		initPersonalityChart_1() {
      new Chart(document.getElementById('personalityChart_1'), {
        type: 'radar',
        data: {
          labels: this.personalities.map(personality => personality.name),
          datasets: [
            {
              fill: true,
              backgroundColor: "rgba(111,148,205,0.7)",
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: this.personalities.map(personality => personality.percentile * 100)
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
    initPersonalityChart_2() {
      new Chart(document.getElementById('personalityChart_2'), {
        type: 'radar',
        data: {
          labels: this.personalities.map(personality => personality.name),
          datasets: [
            {
              fill: true,
              backgroundColor: "rgba(111,148,205,0.7)",
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: this.personalities.map(personality => personality.percentile * 100)
            }
          ]
				},
				options: {
         legend: {
            display: false
         },
				},
      });
    }
	},
	mounted() {
		this.initPersonalityChart_1();
		this.initPersonalityChart_2();
	},
}
</script>

<style>

</style>
