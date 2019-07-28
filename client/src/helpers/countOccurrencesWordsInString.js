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