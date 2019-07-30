<template>
	<div>
		<div style="display: flex; justify-content: space-between; align-items: center;">
			<div class="sectionhead">
				<div class="heading">IMAGE ANALYSIS</div>
				<div class="subhead">by Amazon Rekognition</div>
			</div>
			<div class="wordcount">
				<span class="wcn">Number of images analyzed</span>
				<span class="wcn prp">{{imageCount}}</span>
			</div>
		</div>
		<div class="labelgrid">
			<div class="box">
				<div class="boxheading">LIKES GRAPH</div>
				<likes-chart :posts="perPost"/>
			</div>
			<div style="position: relative;">
				<div class="box">
					<div style="position: absolute;" class="boxheading">AVERAGE EMOTIONS</div>
					<div style="width: 25rem; margin: 0 auto;">
						<emotions-chart :emotions="emotions" />
					</div>
				</div>
				<div class="box">
					<div class="boxheading">FREQUENTLY FOUND LABELS</div>
					<p class="offset-l" v-for="(el, index) of limited" :key="index">{{index + 1}}. {{el[0]}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import EmotionsChart from './ImageEmotionsChart.vue';
	import LikesChart from './LikesChart.vue';

	export default {
		props: ['perPost', 'emotions', 'interests'],
		components: {
			EmotionsChart, LikesChart
		},
		mounted() {
		},
		computed: {
			limited() {
				return Object.entries(this.interests).sort((a, b) => b[1] - a[1]).slice(0, 8)
			},
			imageCount() {
				return this.perPost.length;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.labelgrid {
		display: grid;
		grid-template-columns: 3fr 2fr;
		grid-gap: 1.2rem;
	}
</style>