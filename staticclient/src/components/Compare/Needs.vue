<template>
  <div>
    <div class="box">
      <div id="needs">
        <div class="boxheading">NEEDS</div>
        <span>Compability {{matchNeedsScore}}</span>
        <p><span style="margin-right: .7rem"><b>Excitement:</b> Wants to get out, live life and have fun.</span> 
          <span class="compare-percentile-container">
            <span class="color-purple fw-600">{{needs && needs.need_excitement}}%</span> | <span class="color-orange fw-600">{{needsCompare && needsCompare.need_excitement}}%</span>
          </span>
        </p> 
        <div class="range-slider sliderflex">
          <input class="first-user slider" v-model="needs.need_excitement" min="0" max="100" type="range" disabled>
          <input class="second-user slider" v-model="needsCompare.need_excitement" style="background: transparent;" min="0" max="100" step="0.5" type="range"
            disabled>
        </div>
        <p><span style="margin-right: .7rem"><b>Self-expression:</b> Enjoys asserting their own unique identity.</span> 
          <span class="compare-percentile-container">
            <span class="color-purple fw-600">{{needs && needs.need_self_expression}}%</span> | <span class="color-orange fw-600">{{needsCompare && needsCompare.need_self_expression}}%</span>
          </span>
        </p>
        <div class="range-slider sliderflex">
          <input class="first-user slider" v-model="needs.need_self_expression" min="0" max="100" type="range" disabled>
          <input class="second-user slider" v-model="needsCompare.need_self_expression" style="background: transparent;" min="0" max="100" step="0.5" type="range"
            disabled>
        </div>
        <p><span style="margin-right: .7rem"><b>Curiosity:</b> Has a desire to discover and explore.</span> 
          <span class="compare-percentile-container">
            <span class="color-purple fw-600">{{needs && needs.need_curiosity}}%</span> | <span class="color-orange fw-600">{{needsCompare && needsCompare.need_curiosity}}%</span>
          </span>
        </p>
        <div class="range-slider sliderflex">
          <input class="first-user slider" v-model="needs.need_curiosity" min="0" max="100" type="range" disabled>
          <input class="second-user slider" v-model="needsCompare.need_curiosity" style="background: transparent;" min="0" max="100" step="0.5" type="range"
            disabled>
        </div>
        <p><span style="margin-right: .7rem"><b>Excellence:</b> Sets high standards and desires perfection.</span> 
          <span class="compare-percentile-container">
            <span class="color-purple fw-600">{{needs && needs.need_ideal}}%</span> | <span class="color-orange fw-600">{{needsCompare && needsCompare.need_ideal}}%</span>
          </span>
        </p>
        <div class="range-slider sliderflex">
          <input class="first-user slider" v-model="needs.need_ideal" min="0" max="100" type="range" disabled>
          <input class="second-user slider" v-model="needsCompare.need_ideal" style="background: transparent;" min="0" max="100" step="0.5" type="range"
            disabled>
        </div>
        <p><span style="margin-right: .7rem"><b>Closeness:</b> Relishes being connected to family and friends.</span> 
          <span class="compare-percentile-container">
            <span class="color-purple fw-600">{{needs && needs.need_closeness}}%</span> | <span class="color-orange fw-600">{{needsCompare && needsCompare.need_closeness}}%</span>
          </span>
        </p>
        <div class="range-slider sliderflex" style="display: relative;">
          <input class="first-user slider" v-model="needs.need_closeness" min="0" max="100" type="range" name="need_closeness" disabled>
          <input class="second-user slider" v-model="needsCompare.need_closeness" style="background: transparent;" min="0" max="100" step="0.5" type="range" disabled>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import FoldingCube from '@/components/Loading/Loading.vue';

  export default {
    props: ['needs', 'needsCompare', 'matchScore'],
    watch: {
      needs() {
        return needs
      },
      needsCompare(){
        return needsCompare
      }
    },
    computed: {
      matchNeedsScore() {
        return Math.round(100 - (this.matchScore * 100)) + '%'
      },
    },
  }
</script>

<style lang="scss">
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
  .color-purple { color:#6c3fb6 };
  .color-orange { color: #ff9f6e };
  .first-user[type=range]::-moz-range-thumb {
    opacity: .75;
    background: #6c3fb6;
    border: 1px solid #c6a9f7;
  }
  .first-user[type=range]::-webkit-slider-thumb {
    opacity: .75;
    background: #6c3fb6;
    border: 1px solid #c6a9f7;
  }
  .second-user[type=range]::-moz-range-thumb {
    opacity: .75;
    background: #ff9f6e;
    border: 1px solid #ff8f56;
  }
  .second-user[type=range]::-webkit-slider-thumb {
    opacity: .75;
    background: #ff9f6e;
    border: 1px solid #ff8f56;
  }
  .fw-600 { font-weight: 600; }
  .compare-percentile-container {
    background-color: #f9f9f9;
    padding: .1rem .6rem;
    border-radius: 2rem;
    font-size: 12px;
  }
</style>