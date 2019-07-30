<template>
	<div>
		<div class="sectionhead">
			<div class="heading">WORD CLOUD</div>
			<word-cloud :wordstr="wordStr"/>
		</div>
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
			<div style="display: flex; justify-content: space-between;">
				<div>
					<div class="boxheading">PERSONALITY</div>
					<p class="offset-l"><b>Agreeableness: </b><br>
					&nbsp;&nbsp;&nbsp;A person's tendency to be compassionate and cooperative toward others.</p>
					<p class="offset-l"><b>Extraversion: </b><br>
					&nbsp;&nbsp;&nbsp;Lower value: more introverted, higher value: more extroverted.</p>
					<p class="offset-l"><b>Orderliness: </b><br>
					&nbsp;&nbsp;&nbsp;A person's tendency to be more organized and self-disciplined.</p>
					<p class="offset-l"><b>Neuroticism: </b><br>
					&nbsp;&nbsp;&nbsp;Tendency to feel anger, letting one's emotions take over.</p>
					<p class="offset-l"><b>Openness: </b><br>
					&nbsp;&nbsp;&nbsp;Openness to experiencing different activities, intellectually curious.</p>
				</div>
				<div style="width: 29rem; margin: 0 1rem;">
					<personality-chart :personality="personality"/>
				</div>
			</div>
		</div>
		<div class="traits">
			<div id="needs" class="box">
				<div class="boxheading">NEEDS</div>
				<p><b>Excitement:</b> Wants to get out, live life and have fun.</p>
				<div class="sliderflex">
					<span class="needpercent">{{Math.round(need1) + '%'}}</span>
					<input class="slider" type="range" min="0" max="100" :value="Math.round(need1)" disabled>
				</div>
				<p><b>Self-expression:</b>	Enjoys asserting their own unique identity.</p>
				<div class="sliderflex">
					<span class="needpercent">{{Math.round(need2) + '%'}}</span>
					<input class="slider" type="range" min="0" max="100" :value="Math.round(need2)" disabled>
				</div>
				<p><b>Curiosity:</b>	Has a desire to discover and explore.</p>
				<div class="sliderflex">
					<span class="needpercent">{{Math.round(need3) + '%'}}</span>
					<input class="slider" type="range" min="0" max="100" :value="Math.round(need3)" disabled>
				</div>
				<p><b>Excellence:</b> Sets high standards and desires perfection.</p>
				<div class="sliderflex">
					<span class="needpercent">{{Math.round(need4) + '%'}}</span>
					<input class="slider" type="range" min="0" max="100" :value="Math.round(need4)" disabled>
				</div>
				<p><b>Closeness:</b> Relishes being connected to family and friends.</p>
				<div class="sliderflex">
					<span class="needpercent">{{Math.round(need5) + '%'}}</span>
					<input class="slider" type="range" min="0" max="100" :value="Math.round(need5)" disabled>
				</div>
			</div>
			<div id="values" class="box">
				<div class="boxheading">VALUES</div>
				<p>Shows concern for the wellbeing of others.</p>
				<p>Embraces change, looks for new experiences.</p>
				<p>Emphasizes tradition and order.</p>
				<p>Seeks hedonistic pleasure.</p>
				<p>Seeks personal success.</p>
				<div style="width: 29rem; margin: 0 auto;">
					<values-chart :values="values"/>
				</div>
			</div>
		</div>
		<div id="consumption" class="box">
			<div class="boxheading">CONSUMPTION PREFERENCES</div>
			<p>
				<span :class="con1class"></span>Likely to be influenced by brand name when making product purchases.
			</p>
			<p>
				<span :class="con2class"></span>Likely to be influenced by product utility when making product purchases.
			</p>
			<p>
				<span :class="con3class"></span>Likely to be influenced by social media when making product purchases.
			</p>
			<p>
				<span :class="con4class"></span>Likely to be influenced by family when making product purchases.
			</p>
			<p>
				<span :class="con5class"></span>Likely to consider starting a business in next few years.
			</p>
			<p>
				<span :class="con6class"></span>Likely to be concerned about the environment.
			</p>
			<p>
				<span :class="con7class"></span>Likely to like outdoor activities.
			</p>
		</div>
	</div>
</template>

<script>
import WordCloud from './WordCloud.vue';
import PersonalityChart from './PersonalityChart.vue';
import ValuesChart from './ValuesChart.vue';

function getLikely(num) {
	if(num === 1) {
		return { likely: true }
	} else if(num === 0.5) {
		return { probable: true }
	} else if(num === 0) {
		return { unlikely: true }
	} else return {}
}

export default {
	components: {
		WordCloud, PersonalityChart, ValuesChart
	},
	data() {
		return {
			wordCount: 250,
			wordStr: `It was on the corner of the street that he noticed the first sign of something peculiar -- a cat reading a map. For a second, Mr. Dursley didn't realize what he had seen -- then he jerked his head around to look again. There was a tabby cat standing on the corner of Privet Drive, but there wasn't a map in sight. What could he have been thinking of? It must have been a trick of the light. Mr. Dursley blinked and stared at the cat. It stared back. As Mr. Dursley drove around the corner and up the road, he watched the cat in his mirror. It was now reading the sign that said Privet Drive -- no, looking at the sign; cats couldn't read maps or signs. Mr. Dursley gave himself a little shake and put the cat out of his mind. As he drove toward town he thought of nothing except a large order of drills he was hoping to get that day. But on the edge of town, drills were driven out of his mind by something else. As he sat in the usual morning traffic jam, he couldn't help noticing that there seemed to be a lot of strangely dressed people about. People in cloaks. Mr. Dursley couldn't bear people who dressed in funny clothes -- the getups you saw on young people! He supposed this was some stupid new fashion. He drummed his fingers on the steering wheel and his eyes fell on a huddle of these weirdos standing quite close by. They were whispering excitedly together. Mr. Dursley was enraged to see that a couple of them weren't young at all; why, that man had to be older than he was, and wearing an emerald-green cloak! The nerve of him! But then it struck Mr. Dursley that this was probably some silly stunt -- these people were obviously collecting for something. . . yes, that would be it. The traffic moved on and a few minutes later, Mr. Dursley arrived in the Grunnings parking lot, his mind back on drills. Mr. Dursley always sat with his back to the window in his office on the ninth floor. If he hadn't, he might have found it harder to concentrate on drills that morning. He didn't see the owls swooping past in broad daylight, though people down in the street did; they pointed and gazed open-mouthed as owl after owl sped overhead. Most of them had never seen an owl even at nighttime.`,
			personality: { // key is from personality.trait_id
				"big5_agreeableness": 0.001926483434617321,
				"big5_extraversion": 0.025620723661231526,
				"big5_conscientiousness": 0.059900630700211566,
				"big5_neuroticism": 0.11113747789660056,
				"big5_openness": 0.3941718839705052,
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
	created() {
	},
	computed: {
		per1() { return this.personality.big5_agreeableness * 100 },
		per2() { return this.personality.big5_extraversion * 100 },
		per3() { return this.personality.big5_conscientiousness * 100 },
		per4() { return this.personality.big5_neuroticism * 100 },
		per5() { return this.personality.big5_openness * 100 },
		need1() { return this.needs.need_excitement * 100 },
		need2() { return this.needs.need_self_expression * 100 },
		need3() { return this.needs.need_curiosity * 100 },
		need4() { return this.needs.need_ideal * 100 },
		need5() { return this.needs.need_closeness * 100 },
		val1() { return this.values.value_self_transcendence * 100 },
		val2() { return this.values.value_openness_to_change * 100 },
		val3() { return this.values.value_conservation * 100 },
		val4() { return this.values.value_hedonism * 100 },
		val5() { return this.values.value_self_enhancement * 100 },
		con1() { return this.consumptionPreferences.consumption_preferences_influence_brand_name },
		con2() { return this.consumptionPreferences.consumption_preferences_influence_utility },
		con3() { return this.consumptionPreferences.consumption_preferences_influence_social_media },
		con4() { return this.consumptionPreferences.consumption_preferences_influence_family_members },
		con5() { return this.consumptionPreferences.consumption_preferences_start_business },
		con6() { return this.consumptionPreferences.consumption_preferences_concerned_environment },
		con7() { return this.consumptionPreferences.consumption_preferences_outdoor },
		con1class() {	return getLikely(this.con1)	},
		con2class() {	return getLikely(this.con2)	},
		con3class() {	return getLikely(this.con3)	},
		con4class() {	return getLikely(this.con4)	},
		con5class() {	return getLikely(this.con5)	},
		con6class() {	return getLikely(this.con6)	},
		con7class() {	return getLikely(this.con7)	},
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
	-webkit-appearance: none;  /* Override default CSS styles */
	margin: 0.8rem 0 1rem 0.8rem;
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

</style>
