<template>
	<canvas id="emotionsChart" width="100" height="100"></canvas>
</template>

<script>
const Chart = require('chart.js');
// import 'chartjs-plugin-labels';

export default {
  props: ['emotions'],
	data() {
		return {
			user: {
				"summary": {
					"emotionFromPosts": {
						"DISGUSTED": 1.5186340014139812,
						"SURPRISED": 2.074322912428114,
						"SAD": 0.4627003139919705,
						"ANGRY": 1.1254951159159343,
						"CONFUSED": 1.4659218788146973,
						"CALM": 0.16438447104560006,
						"HAPPY": 93.18852657741971
					},
				},
			}
		}
	},
	methods: {
		initEmotionsChart() {
      let emotionFromPosts = this.user.summary.emotionFromPosts
      let arrKey = [];
      let arrValue = []
      for (const [key, value] of Object.entries(emotionFromPosts)) {
        arrKey.push(key)
        arrValue.push(value)
      }
      new Chart(document.getElementById('emotionsChart'), {
        type: 'pie',
        data: {
          labels: arrKey,
          datasets: [
            {
              label: `Values`,
              fill: true,
              backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#9db3d2", "#fdd074", "#455a63", "#b7e3e2", "#beaed6", "#e96775"],
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: arrValue
            }
          ]
        },
        options: {
          title: { display: true },
          // plugins: {
          //   labels: {
          //     render: 'label',
          //     arc: true,
          //     position: 'border'
          //   }
          // },
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
