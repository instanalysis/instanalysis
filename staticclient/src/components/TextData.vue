<template>
	<div>
		<div style="display: flex; justify-content: space-between; align-items: center;">
			<div class="sectionhead">
				<div class="heading">PERSONALITY PORTRAIT</div>
				<div class="subhead">by IBM Watson</div>
			</div>
			<div class="wordcount">
				<span class="wcn">Number of words analyzed</span>
				<span class="wcn prp">{{wordCount}}</span>
			</div>
		</div>
		<div id="personality" class="box">
			<div class="boxheading">PERSONALITY</div>
			<p>Agreeableness</p>
			<p>Introversion / Extraversion</p>
			<p>Orderliness and Discipline</p>
			<p>Anger and Sensitivity</p>
			<p>Adventurousness</p>
		</div>
		<div class="traits">
			<div id="needs" class="box">
				<div class="boxheading">NEEDS</div>
				<p>Excitement: Wants to get out, live life and have fun.</p>
        <input type="text" id="postlimit" value="10" readonly>
				<span></span>
				<input
          class="slider" type="range" min="0" max="100" value="10" disabled>
				<p>Self-expression:	Enjoys asserting their own unique identity.</p>
				<input
          class="slider" type="range" min="0" max="100" value="10" disabled>
				<p>Curiosity:	Has a desire to discover and explore.</p>
				<input
          class="slider" type="range" min="0" max="100" value="10" disabled>
				<p>Excellence: Sets high standards and desires perfection.</p>
				<input
          class="slider" type="range" min="0" max="100" value="10" disabled>
				<p>Closeness: Relishes being connected to family and friends.</p>
				<input
          class="slider" type="range" min="0" max="100" value="10" disabled>
			</div>
			<div id="values" class="box">
				<div class="boxheading">VALUES</div>
				<p>Shows concern for the wellbeing of others.</p>
				<p>Embraces change, looks for new experiences.</p>
				<p>Emphasizes tradition and order.</p>
				<p>Seeks hedonistic pleasure.</p>
				<p>Seeks personal success.</p>
			</div>
		</div>
		<div id="consumption" class="box">
			<div class="boxheading">CONSUMPTION PREFERENCES</div>
			<p>Likely to be influenced by brand name when making product purchases. <span class="likely">Yes</span></p>
			<p>Likely to be influenced by product utility when making product purchases. <span class="probable">Maybe</span></p>
			<p>Likely to be influenced by social media when making product purchases. <span class="unlikely">No</span></p>
			<p>Likely to be influenced by family when making product purchases.</p>
			<p>Likely to consider starting a business in next few years.</p>
			<p>Likely to be concerned about the environment.</p>
			<p>Likely to like outdoor activities.</p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			wordCount: 250,
			wordStr: '',
			personality: { // key is from personality.trait_id
				"big5_openness": 0.3941718839705052,
				"big5_conscientiousness": 0.059900630700211566,
				"big5_extraversion": 0.025620723661231526,
				"big5_agreeableness": 0.001926483434617321,
				"big5_neuroticism": 0.11113747789660056,
			},
			needs: { // key is from needs.trait_id
				"need_excitement": 0.7786866463203609,
				"need_self_expression": 0.19167131700159862,
				"need_curiosity": 0.385513017099639,
				"need_ideal": 0.3487943433174746,
				"need_closeness": 0.2563866751089902,
			},
			values: { // key is from values.trait_id
				"value_self_transcendence": 0.05015001965356963,
				"value_openness_to_change": 0.6854512392944407,
				"value_conservation": 0.02725197430081272,
				"value_hedonism": 0.3754754766311752,
				"value_self_enhancement": 0.6890067278325013,
			},
			consumptionPreferences: { // key is from "consumption_preference_id", value is from "score"
				"consumption_preferences_influence_brand_name": 1,
				"consumption_preferences_influence_utility": 1,
				"consumption_preferences_influence_social_media": 0,
				"consumption_preferences_influence_family_members": 0.5,
				"consumption_preferences_start_business": 1,
				"consumption_preferences_concerned_environment": 0,
				"consumption_preferences_outdoor": 0.5,
			},
		}
	},
	computed: {
		ps1: () => this.consumptionPreferences.consumption_preferences_influence_brand_name,
		nd1: () => this.consumptionPreferences.consumption_preferences_influence_brand_name,
		vl1: () => this.consumptionPreferences.consumption_preferences_influence_brand_name,
		cp1: () => this.consumptionPreferences.consumption_preferences_influence_brand_name,
		cp2: () => this.consumptionPreferences.consumption_preferences_influence_utility,
		cp3: () => this.consumptionPreferences.consumption_preferences_influence_social_media,
		cp4: () => this.consumptionPreferences.consumption_preferences_influence_family_members,
		cp5: () => this.consumptionPreferences.consumption_preferences_start_business,
		cp6: () => this.consumptionPreferences.consumption_preferences_concerned_environment,
		cp7: () => this.consumptionPreferences.consumption_preferences_outdoor,
	}
}
</script>

<style lang="scss" scoped>
$purp1: #592ba1;
$purp2: #6c3fb6;
.sectionhead {
	margin: 0.8rem 0 0.8rem 0.5rem;
	.heading {
		font-size: 1.2rem;
		font-weight: bold;
		color: $purp1;
	}
}
.wordcount {
	display: inline-flex;
	margin-right: 0.2rem;
	font-size: 0.9rem;
	border-radius: 0.4rem;
	overflow: hidden;
}
.wcn {
	padding: 0.4rem 0.8rem;
	background-color: #eee;
}
.prp {
	background-color: $purp2;
	color: white;
}
.traits {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 1.2rem;
}
.box {
	padding: 0.8rem 1rem;
	margin-bottom: 1.2rem;
	border-radius: 0.5rem;
	box-shadow: 0.1rem 0.2rem 1rem -0.3rem #777;
	line-height: 1.6rem;
	font-size: 0.9rem;
}
#consumption {
	line-height: 1.9rem;
}
.slider {
	width: 85%;
	-webkit-appearance: none;  /* Override default CSS styles */
	margin: 1rem 0;
	appearance: none;
	height: 0.4rem; /* Specified height */
	border-radius: 0.4rem;
	background: #cfcfcf; /* Grey background */
	outline: none; /* Remove outline */
}
.slider::-webkit-slider-thumb {
	-webkit-appearance: none; /* Override default look */
	appearance: none;
	width: 1rem; /* Set a specific slider handle width */
	height: 1rem; /* Slider handle height */
	border-radius: 1rem;
	background: #6730be; /* Green background */
	cursor: pointer; /* Cursor on hover */
}
.boxheading {
	margin-bottom: 0.2rem;
	font-size: 1rem;
	font-weight: 700;
}
@mixin lk {
	color: white;
	padding: 0.1rem 0.4rem;
	border-radius: 0.2rem;
}
.likely {
	@include lk;
	background-color: rgb(20, 151, 16);
}
.probable {
	@include lk;
	background-color: #ce9a3a;
}
.unlikely {
	@include lk;
	background-color: #a32824;
}
</style>

