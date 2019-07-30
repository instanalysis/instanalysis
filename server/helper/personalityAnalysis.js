const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');
require('dotenv').config()
const iam_apikey = process.env.IBM_API_KEY
const converDataStructure = require('../helper/dataToObjectCreator')

const personalityInsights = new PersonalityInsightsV3({
  version: '2017-10-13',
  iam_apikey,
});

module.exports = function (data){

  let {IBMAnalysis} = converDataStructure(data)
  const profileParams = {
    content: JSON.parse(JSON.stringify(IBMAnalysis)),
    content_type: 'application/json',
    consumption_preferences: true,
    raw_scores: true,
  };
  // return personalityInsights.profile(profileParams)
  return new Promise((resolve, reject) => {
    personalityInsights.profile(profileParams)
      .then(response=>{
        resolve(response)
      })
      .catch( err => {
        if(err.code === 400){
          resolve({error: err.message})
        }else{
          throw(err)
        }
      })
  })
}