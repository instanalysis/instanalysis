
const PERSONALITIES_PATH = `http://localhost:3000`;

const app = new Vue({
  el: '#app',
  components: {
  },
  data: {
    user: {
      wordsCount: 0,
      username: '',
      personalities: [],
      needs: [],
      values: [],
      consumption_preferences: [],
      summary: {}
    }
  },
  methods: {
    async fetchPersonalityData() {
      const {data} = await axios.get(`${PERSONALITIES_PATH}/personalityAnalysisResult`)
      const username = await axios.get(`${PERSONALITIES_PATH}/username`)
      const summary = await axios.get(`${PERSONALITIES_PATH}/summary`)

      this.user.wordsCount = data.word_count

      this.user.username = username.data.username;
      this.user.personalities = data.personality;
      this.user.needs = data.needs;
      this.user.values = data.values;
      this.user.consumption_preferences = data.consumption_preferences;
      this.user.summary = summary.data;
      
      this.initNeedsChart();
      this.initPersonalityChart();
      this.initValuesChart();
      this.initEmotionPostsChart();
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
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#9db3d2","#d9ece2", "#e96775", "#455a63", "#b7e3e2", "#beaed6", "#fdd074"],
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: this.user.needs.map(need => need.percentile * 100)
            }
          ]
        },
        options: {
          title: {
            display: false,
          },
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
              backgroundColor: "rgba(111,148,205,0.7)",
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: this.user.personalities.map(personality => personality.percentile * 100)
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
    initValuesChart() {
      new Chart(document.getElementById('valuesChart'), {
        type: 'doughnut',
        data: {
          labels: this.user.values.map(personality => personality.name),
          datasets: [
            {
              label: `${this.user.username} Values`,
              fill: true,
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: this.user.values.map(personality => personality.percentile * 100)
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
    initEmotionPostsChart() {
      let emotionFromPosts = this.user.summary.emotionFromPosts
      let arrKey = [];
      let arrValue = []

      for (const [key, value] of Object.entries(emotionFromPosts)) {
        arrKey.push(key)
        arrValue.push(value)
      }

      new Chart(document.getElementById('emotionPostsChart'), {
        type: 'pie',
        data: {
          labels: arrKey,
          datasets: [
            {
              label: `${this.user.username} Values`,
              fill: true,
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#9db3d2", "#fdd074", "#455a63", "#b7e3e2", "#beaed6", "#e96775"],
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: arrValue
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
  }
})
