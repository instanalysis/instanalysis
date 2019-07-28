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
  const words = countOccurrencesWordsInString('hello hello heelll hll')
  countOccurrencesWordsInString('hello hello heelll hll')

  anychart.onDocumentReady(function() {
    console.log(words);
    // code to create a word cloud chart will be here
    var data = words;
  
    var chart = anychart.tagCloud(data);
  
    // set a chart title
    chart.title('15 most spoken languages')
    // set an array of angles at which the words will be laid out
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
