const lengthChecker = function(input){
    let wordsArr = input.split(" ")
    let filtered = wordsArr.filter(word =>{
        return (word && word[0] !== '#')
    })
    return filtered.length
}

module.exports = lengthChecker