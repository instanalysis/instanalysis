<template>
	<div>
		<div style="display: flex; justify-content: space-between; align-items: center;">
			<div class="sectionhead">
				<div class="heading">IMAGE ANALYSIS</div>
				<div class="subhead">Powered by Amazon Rekognition</div>
			</div>
			<div class="wordcount">
				<span class="wcn">Number of images analyzed</span>
				<span class="wcn prp">{{imageCount ? imageCount : '–'}}</span>
			</div>
		</div>
		<div class="labelgrid" v-if="emotions">
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
					<div class="boxheading" style="margin-bottom: 0.5rem;">MOST FREQUENT IMAGE LABELS</div>
					<div style="display: flex;">
						<div>
							<p class="offset-l" v-for="(el, index) of limited1" :key="index">{{index + 1}}. {{el[0]}}</p>
						</div>
						<div style="margin-left: 1.5rem;">
							<p class="offset-l" v-for="(el, index) of limited2" :key="index">{{index + 5}}. {{el[0]}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<folding-cube v-else/>
	</div>
</template>

<script>
	import EmotionsChart from './ImageEmotionsChart.vue';
	import LikesChart from './LikesChart.vue';
	import FoldingCube from '@/components/Loading/Loading.vue';

	export default {
		props: ['perPost', 'emotions', 'interests'],
		components: {
			EmotionsChart, LikesChart, FoldingCube
		},
		mounted() {
		},
		computed: {
			sortedInterests() {
				return Object.entries(this.interests).sort((a, b) => b[1] - a[1])
			},
			limited1() {
				return this.sortedInterests.slice(0, 4)
			},
			limited2() {
				return this.sortedInterests.slice(4, 8)
			},
			imageCount() {
				if(this.perPost) {
					return this.perPost.length;
				} else return null;
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