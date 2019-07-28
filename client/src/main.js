
const PERSONALITIES_PATH = `http://localhost:3000`;

const app = new Vue({
  el: '#app',
  components: {
  },
  data: {
    user: {
      username: '',
      personalities: [],
      needs: [],
      values: [],
      consumption_preferences: []
    },
    username: ''
  },
  methods: {
    async fetchPersonalityData() {
      const {data} = await axios.get(`${PERSONALITIES_PATH}/personalityAnalysisResult`)
      const username = await axios.get(`${PERSONALITIES_PATH}/username`)

      this.username = username.data.username

      this.user.username = username.data.username;
      this.user.personalities = data.personality;
      this.user.needs = data.needs;
      this.user.values = data.values;
      this.user.consumption_preferences = data.consumption_preferences;
      
      this.initNeedsChart()
      this.initPersonalityChart()
    },
    initNeedsChart() {
      new Chart(document.getElementById('needsChart'), {
        type: 'horizontalBar',
        data: {
          labels: this.user.needs.map(need => need.name),
          datasets: [
            {
              label: `${this.user.username} need`,
              fill: true,
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: this.user.needs.map(need => need.raw_score)
            }
          ]
        },
        options: {
          title: {
            display: true,
          }
        }
      });
    },
    initPersonalityChart() {
      new Chart(document.getElementById('personalityChart'), {
        type: 'radar',
        data: {
          labels: this.user.personalities.map(personality => personality.name),
          datasets: [
            {
              label: `${this.user.username} Personality`,
              fill: true,
              backgroundColor: "rgba(179,181,198,0.5)",
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: this.user.personalities.map(personality => personality.raw_score)
            }
          ]
        },
        options: {
          title: {
            display: true,
          }
        }
      });
    }
  },
  mounted() {
    this.fetchPersonalityData()
  },
})
