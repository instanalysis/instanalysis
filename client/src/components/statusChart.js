Vue.component('statuschart', {
  props: ['id'],
  data() {
    return {
      componentId: `${this.id}`
    }
  },
  template: 
  `
  <div>
    <canvas id="statusChart"  width="400" height="400"></canvas>
  </div>
  `,
  methods: {
    initStatusChart() {
      // const componentId = `'${this.id}'`
      new Chart(document.getElementById(this.componentId), {
        type: 'radar',
        data: {
          labels: ["Strength", "Agility", "Vitality", "Intelegence", "Dexterity"],
          datasets: [
            {
              label: "Gigi Hadid",
              // fill: true,
              backgroundColor: "rgba(179,181,198,0.2)",
              borderColor: "rgba(179,181,198,1)",
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: [8.77, 55.61, 21.69, 6.62, 6.82]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Gigi Hadid Characteristic'
          }
        }
      });
    }
  },
  mounted() {
    this.initStatusChart()
  }
})