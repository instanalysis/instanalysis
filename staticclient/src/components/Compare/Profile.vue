<template>
  <div class="box">
    <div class="compability__container">
      <div class="boxheading" style="margin-bottom: 0px;">Personalities</div>
      <div class="compability__percentile">{{matchPersonalityScore}} Compability</div>
    </div>
    <div style="display: flex;">
      <div style="width:100%">
        <canvas id="personalityChart_1" width="" height="" style="display: unset;"></canvas>
      </div>
      <div style="width:100%">
        <canvas id="personalityChart_2" width="" height="" style="display: unset;"></canvas>  
      </div>
    </div>
  </div>
</template>

<script>
import FoldingCube from '@/components/Loading/Loading.vue';
const Chart = require('chart.js');

export default {
  props: ['personalities', 'personalitiesCompare', 'matchScore'],
	methods: {
		initPersonalityChart() {
      new Chart(document.getElementById('personalityChart_1'), {
        type: 'radar',
        data: {
          labels: this.personalities && this.personalities.map(personality => personality.name),
          datasets: [
            {
              fill: true,
              backgroundColor: "rgba(111,148,205,0.7)",
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: this.personalities && this.personalities.map(personality => personality.percentile * 100)
            }
          ]
				},
				options: {
         legend: {
            display: false
         },
				},
      });

      new Chart(document.getElementById('personalityChart_2'), {
        type: 'radar',
        data: {
          labels: this.personalitiesCompare && this.personalitiesCompare.map(personality => personality.name),
          datasets: [
            {
              fill: true,
              backgroundColor: "rgba(253,159,110,0.7)",
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: this.personalitiesCompare && this.personalitiesCompare.map(personality => personality.percentile * 100)
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
	watch: {
		personalities() {
			this.initPersonalityChart();
    },
    personalitiesCompare() {
			this.initPersonalityChart();
    }
  },
  computed: {
    matchPersonalityScore() {
      return Math.round(100 - (this.matchScore * 100)) + '%'
    },
  },
}
</script>

<style>
.compability__container {
  display: flex;
  margin-bottom: 1rem;
}
.compability__percentile {
  align-self: center;
  margin-left: .5rem;
  color: #616161;
}
</style>
