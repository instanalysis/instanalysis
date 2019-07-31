<template>
	<div id="word-cloud" style="width: 100%; height: 20rem;"></div>
</template>

<script>
import anychart from 'anychart';

export default {
	props: ['wordstr'],
	data() {
		return {
			ignoredWords: ['the', 'a', 'an', 'and', 'of', 'on', 'in', 'at', 'was',
			'he', 'she', 'it', '-', 'for', 'nor', 'but', 'or', 'yet', 'so', 'after',
			'although', 'as', 'as if', 'because', 'before', 'by', ' even', 'if', 'even', 'though']
		}
	},
	mounted() {
		const countOccurrencesWordsInString = str => {  
			let split = str.split(" "),
					obj = {},
					wordsCollection = [];
			for (let x=0; x < split.length; x ++){
				if(!this.ignoredWords.includes(split[x])) {
					if(obj[split[x]] === undefined) {
						obj[split[x]] = 1;
					} else {
						obj[split[x]] ++;
					}
				}
			}
			// console.log(obj) // filter here if threshold required
			Object.keys(obj).forEach(e => wordsCollection.push({x: e, value: obj[e]}));
			return wordsCollection
		}
		const words = countOccurrencesWordsInString(this.wordstr)
		anychart.onDocumentReady(function() {
			let chart = anychart.tagCloud(words);
			chart.angles([0])
			
			chart.container("word-cloud");
			chart.listen("pointClick", function(e){
				let url = "https://en.wikipedia.org/wiki/" + e.point.get("x");
				window.open(url, "_blank");
			});
			chart.draw();
		});
	}
}
</script>

<style>

</style>
