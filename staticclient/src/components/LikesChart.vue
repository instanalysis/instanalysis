<template>
	<canvas id="likesChart" style="display: unset;"></canvas>
</template>

<script>
const Chart = require('chart.js');

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
          labels: this.oldestFirst.map(post => new Date(post.date).toDateString().substring(4, 15)),
          datasets: [
            {
              fill: true,
              backgroundColor: "rgba(111,148,205,0.7)",
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: this.oldestFirst.map(post => post.likes)
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
          }
				},
      });
    },
	},
	mounted() {
		this.initLikesChart();
  },
  computed: {
    oldestFirst() {
      return this.posts.reverse()
    }
  },
}
</script>

<style>

</style>
