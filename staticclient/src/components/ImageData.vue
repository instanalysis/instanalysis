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
				<div class="boxheading">AVERAGE EMOTIONS</div>
			</div>
			<div class="box">
				<div class="boxheading">FREQUENTLY FOUND LABELS</div>
				<p v-for="(value, label, index) of labels" :key="index">{{index + 1}}. {{label}}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			imageCount: 22,
			ageRange: {
				low: 24,
				high: 31,
			},
			gender: {
				value: 'male',
				confidence: 85,
			},
			emotions: [
				{
					"Type": "CONFUSED",
					"Confidence": 0.6553729176521301
				},
				{
					"Type": "SAD",
					"Confidence": 0.30191662907600403
				},
				{
					"Type": "DISGUSTED",
					"Confidence": 0.8796433210372925
				},
				{
					"Type": "SURPRISED",
					"Confidence": 1.831209421157837
				},
				{
					"Type": "HAPPY",
					"Confidence": 95.47262573242188
				},
				{
					"Type": "CALM",
					"Confidence": 0.10131055116653442
				},
				{
					"Type": "ANGRY",
					"Confidence": 0.7579055428504944
				}
			],
			labels: {
				'Car': 12,
				'Watch': 8,
				'Motorcycle': 7,
				'Mountain': 1,
				'Design': 1,
			},
		}
	}
}
</script>

<style lang="scss" scoped>
.labelgrid {
	display: grid;
	grid-template-columns: 5fr 3fr;
	grid-gap: 1.2rem;
}
</style>
