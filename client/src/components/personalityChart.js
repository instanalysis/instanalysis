Vue.component('personalitychart', {
  props: ['id', 'user', 'data'],
  data() {
    return {
      componentId: `${this.id}`,
    }
  },
  template: 
  `
  <div>
    <canvas id="personalityChart" width="400" height="400"></canvas>
  </div>
  `,
  methods: {
    initPersonalityChart() {
      console.log(this.data);
      new Chart(document.getElementById(this.componentId), {
        type: 'horizontalBar',
        data: {
          labels: this.data,
          datasets: [
            {
              label: this.username,
              // fill: true,
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: [77, 55, 79, 66, 82]
            }
          ]
        },
        options: {
          title: {
            display: true,
            // text: username
          }
        }
      });
    },
  },
  mounted() {
    this.initPersonalityChart()
    // this.fetchPersonalityData()
  },
  computed: {
    username() {
      return this.user.username
    }
  },
})