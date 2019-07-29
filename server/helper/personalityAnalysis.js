const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');
require('dotenv').config()
const iam_apikey = process.env.IBM_API_KEY
const convertDataStructure = require('../helper/dataToObjectCreator')

const personalityInsights = new PersonalityInsightsV3({
  version: '2017-10-13',
  iam_apikey,
});

module.exports = function (data){
    let {IBMAnalysis} = convertDataStructure(data)
    const profileParams = {
      content: JSON.parse(JSON.stringify(IBMAnalysis)),
      content_type: 'application/json',
      consumption_preferences: true,
      raw_scores: true,
    };

    console.log("starting ibm analysis")
    const personality = personalityInsights.profile(profileParams)
    return personality
}