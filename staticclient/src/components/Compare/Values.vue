<template>
  <div id="values" class="box">
    <div class="boxheading">VALUES</div>
    <p>Shows concern for the wellbeing of others.</p>
    <p>Embraces change, looks for new experiences.</p>
    <p>Emphasizes tradition and order.</p>
    <p>Seeks hedonistic pleasure.</p>
    <p>Seeks personal success.</p>
    <div style="width: 29rem; margin: 0 auto;">
      <values-chart :values="values1"/>
      <values-chart :values="values2"/>
    </div>
  </div>
</template>

<script>
import ValuesChart from '../ValuesChart';

export default {
  components: {
    ValuesChart
  },
  data() {
    return {
      values1: { // key is from values.trait_id
				"value_self_transcendence": 0.05015001965356963,
				"value_openness_to_change": 0.6854512392944407,
				"value_conservation": 0.02725197430081272,
				"value_hedonism": 0.3754754766311752,
				"value_self_enhancement": 0.6890067278325013,
      },
      values2: { // key is from values.trait_id
				"value_self_transcendence": 0.05015001965356963,
				"value_openness_to_change": 0.6854512392944407,
				"value_conservation": 0.02725197430081272,
				"value_hedonism": 0.3754754766311752,
				"value_self_enhancement": 0.6890067278325013,
			}
    }
  },
}
</script>

<style>

</style>
