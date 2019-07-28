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
  },
  mounted() {
  }
})