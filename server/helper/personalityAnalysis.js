const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');
require('dotenv').config()
const iam_apikey = process.env.IBM_API_KEY

const personalityInsights = new PersonalityInsightsV3({
  version: '2017-10-13',
  iam_apikey,
});

module.exports = function (data){
  const profileParams = {
    content: JSON.parse(JSON.stringify(data)),
    content_type: 'application/json',
    consumption_preferences: true,
    raw_scores: true,
  };
  return personalityInsights.profile(profileParams)
}