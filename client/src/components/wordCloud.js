const ignoredWord = []

const countOccurrencesWordsInString = (str) => {  
  var split = str.split(" "),
      obj = {},
      wordsCollection = [];
  
  for (var x=0; x<split.length; x++){
    if(obj[split[x]]===undefined){
      obj[split[x]]=1;
    }else{
      obj[split[x]]++;
    }
  }
  
  Object.keys(obj).forEach(e => wordsCollection.push({x: e, value: obj[e]}));
  
  return wordsCollection
}

(function iniWordsCloud() {
  const words = countOccurrencesWordsInString(`It was on the corner of the street that he noticed the first sign of something peculiar -- a cat reading a map. For a second, Mr. Dursley didn't realize what he had seen -- then he jerked his head around to look again. There was a tabby cat standing on the corner of Privet Drive, but there wasn't a map in sight. What could he have been thinking of? It must have been a trick of the light. Mr. Dursley blinked and stared at the cat. It stared back. As Mr. Dursley drove around the corner and up the road, he watched the cat in his mirror. It was now reading the sign that said Privet Drive -- no, looking at the sign; cats couldn't read maps or signs. Mr. Dursley gave himself a little shake and put the cat out of his mind. As he drove toward town he thought of nothing except a large order of drills he was hoping to get that day.

  But on the edge of town, drills were driven out of his mind by something else. As he sat in the usual morning traffic jam, he couldn't help noticing that there seemed to be a lot of strangely dressed people about. People in cloaks. Mr. Dursley couldn't bear people who dressed in funny clothes -- the getups you saw on young people! He supposed this was some stupid new fashion. He drummed his fingers on the steering wheel and his eyes fell on a huddle of these weirdos standing quite close by. They were whispering excitedly together. Mr. Dursley was enraged to see that a couple of them weren't young at all; why, that man had to be older than he was, and wearing an emerald-green cloak! The nerve of him! But then it struck Mr. Dursley that this was probably some silly stunt -- these people were obviously collecting for something. . . yes, that would be it. The traffic moved on and a few minutes later, Mr. Dursley arrived in the Grunnings parking lot, his mind back on drills.
  
  Mr. Dursley always sat with his back to the window in his office on the ninth floor. If he hadn't, he might have found it harder to concentrate on drills that morning. He didn't see the owls swooping past in broad daylight, though people down in the street did; they pointed and gazed open-mouthed as owl after owl sped overhead. Most of them had never seen an owl even at nighttime. Mr. Dursley, however, had a perfectly normal, owl-free morning. He yelled at five different people. He made several important telephone calls and shouted a bit more. He was in a very good mood until lunchtime, when he thought he'd stretch his legs and walk across the road to buy himself a bun from the bakery.`)

  anychart.onDocumentReady(function() {
    var data = words;
  
    var chart = anychart.tagCloud(data);
  
    chart.angles([0])
    // enable a color range
    // chart.colorRange(true);
    // set the color range length
    // chart.colorRange().length('80%');
  
    // display the word cloud chart
    chart.container("word-cloud");
    chart.listen("pointClick", function(e){
      var url = "https://en.wikipedia.org/wiki/" + e.point.get("x");
      window.open(url, "_blank");
    });
    chart.draw();
  });
})()
