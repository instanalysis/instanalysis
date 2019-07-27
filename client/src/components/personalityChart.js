Vue.component('personalitychart', {
  props: ['id'],
  data() {
    return {
      componentId: `${this.id}`
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
      new Chart(document.getElementById(this.componentId), {
        type: 'horizontalBar',
        data: {
          labels: ["Strength", "Agility", "Vitality", "Intelegence", "Dexterity"],
          datasets: [
            {
              label: "Gigi Hadid Personality",
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
            text: 'Gigi Hadid Characteristic'
          }
        }
      });
    }
  },
  mounted() {
    this.initPersonalityChart()
  },
})