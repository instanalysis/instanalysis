<template>
  <div>
    <div class="box">
      <div id="needs">
        <div class="boxheading">NEEDS</div>
        <p><span style="margin-right: .7rem"><b>Excitement:</b> Wants to get out, live life and have fun.</span> 
          <span class="compare-percentile-container">
            <span class="color-purple fw-600">{{needs.need_excitement}}%</span> -- <span class="color-orange fw-600">80%</span>
          </span>
        </p> 
        <div class="range-slider sliderflex">
          <input class="first-user slider" v-model="needs.need_excitement" min="0" max="100" type="range" disabled>
          <input class="second-user slider" value="80" style="background: transparent;" min="0" max="100" step="0.5" type="range"
            disabled>
        </div>
        <p><span style="margin-right: .7rem"><b>Self-expression:</b> Enjoys asserting their own unique identity.</span> 
          <span class="compare-percentile-container">
            <span class="color-purple fw-600">{{needs.need_self_expression}}%</span> -- <span class="color-orange fw-600">10%</span>
          </span>
        </p>
        <div class="range-slider sliderflex">
          <input class="first-user slider" v-model="needs.need_self_expression" min="0" max="100" type="range" disabled>
          <input class="second-user slider" value="10" style="background: transparent;" min="0" max="100" step="0.5" type="range"
            disabled>
        </div>
        <p><span style="margin-right: .7rem"><b>Curiosity:</b> Has a desire to discover and explore.</span> 
          <span class="compare-percentile-container">
            <span class="color-purple fw-600">{{needs.need_curiosity}}%</span> -- <span class="color-orange fw-600">100%</span>
          </span>
        </p>
        <div class="range-slider sliderflex">
          <input class="first-user slider" v-model="needs.need_curiosity" min="0" max="100" type="range" disabled>
          <input class="second-user slider" value="100" style="background: transparent;" min="0" max="100" step="0.5" type="range"
            disabled>
        </div>
        <p><span style="margin-right: .7rem"><b>Excellence:</b> Sets high standards and desires perfection.</span> 
          <span class="compare-percentile-container">
            <span class="color-purple fw-600">{{needs.need_ideal}}%</span> -- <span class="color-orange fw-600">20%</span>
          </span>
        </p>
        <div class="range-slider sliderflex">
          <input class="first-user slider" v-model="needs.need_ideal" min="0" max="100" type="range" disabled>
          <input class="second-user slider" value="20" style="background: transparent;" min="0" max="100" step="0.5" type="range"
            disabled>
        </div>
        <p><span style="margin-right: .7rem"><b>Closeness:</b> Relishes being connected to family and friends.</span> 
          <span class="compare-percentile-container">
            <span class="color-purple fw-600">{{needs.need_closeness}}%</span> -- <span class="color-orange fw-600">40%</span>
          </span>
        </p>
        <div class="range-slider sliderflex" style="display: relative;">
          <div style="display: absolute;">
            <output for="need_closeness"></output>
            <input class="first-user slider" v-model="needs.need_closeness" min="0" max="100" type="range" name="need_closeness" disabled>
          </div>
          <div style="display: absolute;">
            <output for="need_closeness"></output>
            <input class="second-user slider" value="40" style="background: transparent;" min="0" max="100" step="0.5" type="range" disabled>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['needs']
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
  .color-purple { color:#6c3fb6 };
  .color-orange { color: #ff9f6e };
  .first-user[type=range]::-moz-range-thumb {
    background: #6c3fb6;
    border: 1px solid #c6a9f7;
  }
  .first-user[type=range]::-webkit-slider-thumb {
    background: #6c3fb6;
    border: 1px solid #c6a9f7;
  }
  .second-user[type=range]::-moz-range-thumb {
    background: #ff9f6e;
    border: 1px solid #ff8f56;
  }
  .second-user[type=range]::-webkit-slider-thumb {
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
  // .first-user[type=range]::-webkit-slider-thumb:after { 
  //   content: "";
  //   position: absolute;
  //   width: 0;
  //   height: 0;
  //   border-top: 10px solid #999999;
  //   border-left: 5px solid transparent;
  //   border-right: 5px solid transparent;
  //   top: 100%;
  //   left: 50%;
  //   margin-left: -5px;
  //   margin-top: -1px;
  // }

  // output { 
  //   position: absolute;
  //   background-image: linear-gradient(top, #444444, #999999);
  //   width: 40px; 
  //   height: 30px; 
  //   text-align: center; 
  //   color: white; 
  //   border-radius: 10px; 
  //   display: inline-block; 
  //   font: bold 15px/30px Georgia;
  //   bottom: 175%;
  //   left: 0;
  //   margin-left: -1%;
  // }
  // output:after { 
  //   content: "";
  //   position: absolute;
  //   width: 0;
  //   height: 0;
  //   border-top: 10px solid #999999;
  //   border-left: 5px solid transparent;
  //   border-right: 5px solid transparent;
  //   top: 100%;
  //   left: 50%;
  //   margin-left: -5px;
  //   margin-top: -1px;
  // }
</style>