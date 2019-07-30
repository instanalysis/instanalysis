<template>
  <div id="values" class="box">
    <div class="boxheading">VALUES</div>
    <p>Shows concern for the wellbeing of others.</p>
    <div class="range-slider sliderflex">
      <input class="slider" value=valueTranscendece min="0" max="100" type="range" disabled>
      <input class="slider" value="80" style="background: transparent;" min="0" max="100" step="0.5" type="range"
        disabled>
    </div>
    <p>Embraces change, looks for new experiences.</p>
    <div class="range-slider sliderflex">
      <input class="slider" value=valueOpenness min="0" max="100" type="range" disabled>
      <input class="slider" value="80" style="background: transparent;" min="0" max="100" step="0.5" type="range"
        disabled>
    </div>
    <p>Emphasizes tradition and order.</p>
    <div class="range-slider sliderflex">
      <input class="slider" value=valueConversation min="0" max="100" type="range" disabled>
      <input class="slider" value="80" style="background: transparent;" min="0" max="100" step="0.5" type="range"
        disabled>
    </div>
    <p>Seeks hedonistic pleasure.</p>
    <div class="range-slider sliderflex">
      <input class="slider" value=valueHedonism min="0" max="100" type="range" disabled>
      <input class="slider" value="80" style="background: transparent;" min="0" max="100" step="0.5" type="range"
        disabled>
    </div>
    <p>Seeks personal success.</p>
    <div class="range-slider sliderflex">
      <input class="slider" value=valueEnhancement min="0" max="100" type="range" disabled>
      <input class="slider" value="80" style="background: transparent;" min="0" max="100" step="0.5" type="range"
        disabled>
    </div>
  </div>
</template>

<script>
  import ValuesChart from '../ValuesChart';

  export default {
    props: ['values'],
    components: {
      ValuesChart
    },
    data() {
      return {
      }
    },
    computed: {
      valueTranscendece() { return this.values.value_self_transcendence },
      valueOpenness() { return this.values.value_openness_to_change },
      valueEnhancement() { return this.values.value_self_enhancement },
      valueConversation() { return this.values.value_conservation },
      valueHedonism() { return this.values.value_hedonism },
    },
  }
</script>

<style lang="scss" scoped>
  $purp1: #592ba1;
  $purp2: #6c3fb6;

  .traits {
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-gap: 1.2rem;
  }

  #personality {
    padding-bottom: 0;
  }

  #consumption {
    line-height: 1.9rem;
    margin-left: auto;
    margin-right: auto;
    max-width: 45rem;
  }

  .sliderflex {
    display: flex;
    align-items: center;
    padding: 0 0.4rem 0.6rem 0.2rem;
  }

  .slider {
    flex: 1;
    -webkit-appearance: none;
    /* Override default CSS styles */
    margin: 0.8rem 0 1rem 0.8rem;
    appearance: none;
    height: 0.4rem;
    /* Specified height */
    border-radius: 0.4rem;
    background: #cfcfcf;
    /* Grey background */
    outline: none;
    /* Remove outline */
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    /* Override default look */
    appearance: none;
    width: 1rem;
    /* Set a specific slider handle width */
    height: 1rem;
    /* Slider handle height */
    border-radius: 1rem;
    background: #6730be;
    /* Green background */
  }

  .needpercent {
    display: inline-block;
    margin-right: 0.4rem;
    padding: 0.1rem 0.4rem;
    border-radius: 0.3rem;
    background-color: $purp2;
    color: white;
  }

  @mixin lk {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    margin: 0 0.4rem 0.4rem 0;
    padding: 0 0.4rem;
    width: 3.8rem;
    border-radius: 0.3rem;
  }

  .likely {
    @include lk;
    background-color: #25a830;
    color: white;

    &::after {
      content: "Likely";
    }
  }

  .probable {
    @include lk;
    background-color: #ccc;

    &::after {
      content: "Neutral";
    }
  }

  .unlikely {
    @include lk;
    background-color: #bb3b3b;
    color: white;

    &::after {
      content: "Unlikely";
    }
  }

  div.range-slider {
    position: relative;
    width: 100%;
    height: 35px;
    text-align: center;
  }

  div.range-slider input {
    pointer-events: none;
    position: absolute;
    width: 98%;
    margin: 0;
    padding: 0;
  }
</style>