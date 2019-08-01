<template>
	<div>
		<div style="margin-top: 0.5rem; margin-bottom: 0;" class="sectionhead">
			<div class="heading">WORD CLOUD</div>
			<word-cloud :wordstr="wordStr" v-if="wordStr"/>
		</div>
		<div style="display: flex; justify-content: space-between; align-items: center;">
			<div class="sectionhead">
				<div class="heading">PERSONALITY PORTRAIT</div>
				<div class="subhead">by IBM Watson</div>
			</div>
			<div class="wordcount">
				<span class="wcn">Number of words analyzed</span>
				<span class="wcn prp">{{wordCount ? wordCount : '–'}}</span>
			</div>
		</div>
		<div v-if="personality">
			<div id="personality" class="box">
				<div style="display: flex; justify-content: space-between;">
					<div>
						<div class="boxheading">PERSONALITY</div>
						<p class="offset-l"><b>Agreeableness: </b><br>
							<span class="offset-l">A person's tendency to be compassionate and cooperative toward others.</span>
						</p>
						<p class="offset-l"><b>Extraversion: </b><br>
							<span class="offset-l">Lower value: more introverted, higher value: more extroverted.</span>
						</p>
						<p class="offset-l"><b>Orderliness: </b><br>
							<span class="offset-l">A person's tendency to be more organized and self-disciplined.</span>
						</p>
						<p class="offset-l"><b>Neuroticism: </b><br>
							<span class="offset-l">Tendency to feel anger, letting one's emotions take over.</span>
						</p>
						<p class="offset-l"><b>Openness: </b><br>
							<span class="offset-l">Openness to experiencing different activities, intellectually curious.</span>
						</p>
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
						<span class="needpercent">{{need1 + '%'}}</span>
						<input class="slider" type="range" min="0" max="100" :value="need1" disabled>
					</div>
					<p><b>Self-expression:</b>	Enjoys asserting their own unique identity.</p>
					<div class="sliderflex">
						<span class="needpercent">{{need2 + '%'}}</span>
						<input class="slider" type="range" min="0" max="100" :value="need2" disabled>
					</div>
					<p><b>Curiosity:</b>	Has a desire to discover and explore.</p>
					<div class="sliderflex">
						<span class="needpercent">{{need3 + '%'}}</span>
						<input class="slider" type="range" min="0" max="100" :value="need3" disabled>
					</div>
					<p><b>Excellence:</b> Sets high standards and desires perfection.</p>
					<div class="sliderflex">
						<span class="needpercent">{{need4 + '%'}}</span>
						<input class="slider" type="range" min="0" max="100" :value="need4" disabled>
					</div>
					<p><b>Closeness:</b> Relishes being connected to family and friends.</p>
					<div class="sliderflex">
						<span class="needpercent">{{need5 + '%'}}</span>
						<input class="slider" type="range" min="0" max="100" :value="need5" disabled>
					</div>
				</div>
				<div id="values" class="box">
					<div class="boxheading">VALUES</div>
					<p class="valtrait"><span class="needpercent">{{val1 + '%'}}</span><b>Helping others: </b>Shows concern for the wellbeing of others.</p>
					<p class="valtrait"><span class="needpercent">{{val2 + '%'}}</span><b>Exploration: </b>Embraces change, looks for new experiences.</p>
					<p class="valtrait"><span class="needpercent">{{val3 + '%'}}</span><b>Achievement: </b>Seeks personal success for themselves.</p>
					<p class="valtrait"><span class="needpercent">{{val4 + '%'}}</span><b>Tradition: </b>Emphasizes tradition and order.</p>
					<p class="valtrait"><span class="needpercent">{{val5 + '%'}}</span><b>Hedonism: </b>Seeks hedonistic pleasure.</p>
					<div style="width: 29rem; margin: 0 auto;">
						<values-chart :values="values"/>
					</div>
				</div>
			</div>
			<div id="consumption" class="box">
				<div class="boxheading">CONSUMPTION PREFERENCES</div>
				<div style="max-width: 45rem; margin: 0 auto;">
					<p><span :class="con1class"></span>Likely to be influenced by brand name when making product purchases.</p>
					<p><span :class="con2class"></span>Likely to be influenced by product utility when making product purchases.</p>
					<p><span :class="con3class"></span>Likely to be influenced by social media when making product purchases.</p>
					<p><span :class="con4class"></span>Likely to be influenced by family when making product purchases.</p>
					<p><span :class="con5class"></span>Likely to consider starting a business in next few years.</p>
					<p><span :class="con6class"></span>Likely to be concerned about the environment.</p>
					<p><span :class="con7class"></span>Likely to like outdoor activities.</p>
				</div>
			</div>
		</div>
		<div style="margin: 1rem 2rem; text-align: center;" v-if="ibmError">{{ibmError}}</div>
		<folding-cube v-if="showLoader"/>
	</div>
</template>

<script>
import WordCloud from './WordCloud.vue';
import PersonalityChart from './PersonalityChart.vue';
import ValuesChart from './ValuesChart.vue';
import FoldingCube from '@/components/Loading/Loading.vue';

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
	props: [
		'wordStr', 'wordCount',	'personality', 'needs', 'values',
		'consumptionPreferences', 'ibmError',
	],
	components: {
		WordCloud, PersonalityChart, ValuesChart, FoldingCube
	},
	computed: {
		per1() { return this.personality.big5_agreeableness },
		per2() { return this.personality.big5_extraversion },
		per3() { return this.personality.big5_conscientiousness },
		per4() { return this.personality.big5_neuroticism },
		per5() { return this.personality.big5_openness },
		need1() { return this.needs.need_excitement },
		need2() { return this.needs.need_self_expression },
		need3() { return this.needs.need_curiosity },
		need4() { return this.needs.need_ideal },
		need5() { return this.needs.need_closeness },
		val1() { return this.values.value_self_transcendence },
		val2() { return this.values.value_openness_to_change },
		val3() { return this.values.value_self_enhancement },
		val4() { return this.values.value_conservation },
		val5() { return this.values.value_hedonism },
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
		showLoader() {
			return (!this.personality) && (!this.ibmError)
		},
	},
}
</script>

<style lang="scss" scoped>
$purp1: #592ba1;
$purp2: #6c3fb6;
.traits {
	display: grid;
	grid-template-columns: 4fr 5fr;
	grid-gap: 1.2rem;
}
#personality {
	padding-bottom: 0;
}
#consumption {
	line-height: 1.9rem;
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
	max-height: 1.6rem;
	margin-right: 0.4rem;
	padding: 0.1rem 0.4rem;
	border-radius: 0.3rem;
	vertical-align: middle;
	background-color: $purp2;
	color: white;
}
.valtrait {
	margin-bottom: 0.5rem;
	margin-left: 0.3rem;
}
.valtrait:nth-child(6) {
	margin-bottom: 0rem;
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

