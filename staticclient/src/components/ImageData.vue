<template>
	<div>
		Amazon Rekognition
	</div>
</template>

<script>
export default {
	data() {
		return {
			ageRange: {
				low: 0,
				high: 0,
			},
			gender: {
				value: null,
				confidence: 0,
			},
			emotions: [
				{
					type: 'SURPRISED',
					confidence: 4.019230842590332
				},
				{
					type: 'ANGRY',
					confidence: 4.066211700439453
				},
				{
					type: 'SAD',
					confidence: 1.7489697933197021
				},
				{
					type: 'CONFUSED',
					confidence: 7.950313568115234
				},
				{
					type: 'DISGUSTED',
					confidence: 6.63055944442749
				},
				{
					type: 'CALM',
					confidence: 0.668975830078125
				},
				{
					type: 'HAPPY',
					confidence: 74.91573333740234
				}
			],
			labels: [],
		}
	}
}
</script>

<style lang="sass" scoped>

</style>
