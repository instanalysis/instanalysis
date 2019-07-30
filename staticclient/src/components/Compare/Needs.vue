<template>
  <div>
    <div class="box">
      <div id="needs">
        <div class="boxheading">NEEDS</div>
        <p><b>Excitement:</b> Wants to get out, live life and have fun.</p>
        <div class="range-slider sliderflex">
          <input class="slider" value=needExcitement min="0" max="100" type="range" disabled>
          <input class="slider" value="80" style="background: transparent;" min="0" max="100" step="0.5" type="range"
            disabled>
        </div>
        <p><b>Self-expression:</b> Enjoys asserting their own unique identity.</p>
        <div class="range-slider sliderflex">
          <input class="slider" value=needSelfExpression min="0" max="100" type="range" disabled>
          <input class="slider" value="10" style="background: transparent;" min="0" max="100" step="0.5" type="range"
            disabled>
        </div>
        <p><b>Curiosity:</b> Has a desire to discover and explore.</p>
        <div class="range-slider sliderflex">
          <input class="slider" value=needCuriosity min="0" max="100" type="range" disabled>
          <input class="slider" value="100" style="background: transparent;" min="0" max="100" step="0.5" type="range"
            disabled>
        </div>
        <p><b>Excellence:</b> Sets high standards and desires perfection.</p>
        <div class="range-slider sliderflex">
          <input class="slider" value=needIdeal min="0" max="100" type="range" disabled>
          <input class="slider" value="20" style="background: transparent;" min="0" max="100" step="0.5" type="range"
            disabled>
        </div>
        <p><b>Closeness:</b> Relishes being connected to family and friends.</p>
        <div class="range-slider sliderflex">
          <input class="slider" value=needCloseness min="0" max="100" type="range" disabled>
          <input class="slider" value="40" style="background: transparent;" min="0" max="100" step="0.5" type="range"
            disabled>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['needs'],
    computed: {
      needExcitement() { return this.needs.need_excitement },
      needSelfExpression() { return this.needs.need_self_expression },
      needCuriosity() { return this.needs.need_curiosity },
      needIdeal() { return this.needs.need_ideal },
      needCloseness() { return this.needs.need_closeness },
    }
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