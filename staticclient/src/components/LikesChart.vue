<template>
	<canvas id="likesChart" style="display: unset;"></canvas>
</template>

<script>
const Chart = require('chart.js');

function cleanDate() {

}

export default {
  props: ['posts'],
	data() {
		return {
			user: {
				posts: [
          {
            'likes': 100,
            'date': 'May 9th'
          }, 
          {
              'likes': 151,
              'date': 'June 12'
          },
          {
              'likes': 202,
              'date': 'June 13'
          },
          {
              'likes': 222,
              'date': 'June 14'
          },
          {
              'likes': 220,
              'date': 'June 15'
          },
          {
              'likes': 230,
              'date': 'June 16'
          },
          {
              'likes': 330,
              'date': 'June 17'
          }
        ],
			}
		}
	},
	methods: {
		initLikesChart() {
      new Chart(document.getElementById('likesChart'), {
        type: 'line',
        data: {
          labels: this.posts.map(post => new Date().toDateString().substring(4, 10)),
          datasets: [
            {
              fill: true,
              backgroundColor: "rgba(111,148,205,0.7)",
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: this.posts.map(post => post.likes)
            }
          ]
				},
				options: {
          legend: {
            display: false
          },
          hover: {
            mode: 'index'
          },
          animation: {
            duration: 0.5,
            // onComplete: function () {
            //   var chartInstance = this.chart,
            //     ctx = chartInstance.ctx;
            //   ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            //   ctx.textAlign = 'center';
            //   ctx.textBaseline = 'bottom';
            //   this.data.datasets.forEach(function (dataset, i) {
            //     var meta = chartInstance.controller.getDatasetMeta(i);
            //     meta.data.forEach(function (bar, index) {
            //       var data = dataset.data[index];                            
            //       ctx.fillText(data, bar._model.x, bar._model.y - 5);
            //     });
            //   });
            // }
          }
				},
      });
    },
	},
	mounted() {
		this.initLikesChart();
	},
}
</script>

<style>

</style>
