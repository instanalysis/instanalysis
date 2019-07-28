anychart.onDocumentReady(function() {
  // console.log(user);
  // code to create a word cloud chart will be here
  var data = [
    {"x": "Watch", "value": 1090000000},
    {"x": "Hiking", "value": 983000000},
    {"x": "Hindustani", "value": 544000000},
    {"x": "Spanish", "value": 527000000},
    {"x": "Arabic", "value": 422000000},
    {"x": "Malay", "value": 281000000},
    {"x": "Russian", "value": 267000000},
    {"x": "Bengali", "value": 261000000},
    {"x": "Portuguese", "value": 229000000},
    {"x": "French", "value": 229000000},
    {"x": "Hausa", "value": 150000000},
    {"x": "Punjabi", "value": 148000000},
    {"x": "Japanese", "value": 129000000},
    {"x": "German", "value": 129000000},
    {"x": "Persian", "value": 121000000}
  ];

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