module.exports = compare

function compare (dataSetOne, dataSetTwo) {
    let results = {}
    console.log('mulai di ')
	//compare personality
	const p1Arr = dataSetOne.personality
	const p2Arr = dataSetTwo.personality
	let pDistance = 0
	for (let i = 0; i < p1Arr.length; i++){
		//for each personality facet (openness, conscientiousness,..)
		let facet1 = p1Arr[i]
		let facet2 = p2Arr[i]
		for (let j = 0; j < facet1.children.length; j ++){
			// for each trait in the facet, get score and compare
			let diff = facet1.children[j].raw_score - facet2.children[j].raw_score
			let diffSquared = diff * diff
			pDistance += diffSquared
		}
	}
	let pScore = Math.sqrt(pDistance)
	results.personalityScore = pScore

	const n1Arr = dataSetOne.needs
	const n2Arr = dataSetOne.needs
	let nDistance = 0
	for (let i = 0; i< n1Arr.length; i++){
		let diff = n1Arr[i].raw_score - n2Arr[i].raw_score
		let diffSquared = diff * diff
		nDistance += diffSquared
	}
	let nScore = Math.sqrt(nDistance)
	results.needsScore = nScore

	const v1Arr = dataSetOne.values
	const v2Arr = dataSetOne.values
	let vDistance = 0
	for (let i = 0; i< v1Arr.length; i++){
		let diff = v1Arr[i].raw_score - v2Arr[i].raw_score
		let diffSquared = diff * diff
		vDistance += diffSquared
	}
	let vScore = Math.sqrt(vDistance)
	results.valuesScore = vScore

	results.totalScore = (pScore +  nScore + vScore)/3

	return results
}



let mockData = {
    personalityAnalysisResult: {
        word_count: 100,
        word_count_message: "There were 100 words in the input. We need a minimum of 600, preferably 1,200 or more, to compute statistically significant estimates",
        processed_language: "en",
        personality: [{
                trait_id: "big5_openness",
                name: "Openness",
                category: "personality",
                percentile: 0.11755473810359757,
                raw_score: 0.7107450872326675,
                significant: true,
                children: [{
                        trait_id: "facet_adventurousness",
                        name: "Adventurousness",
                        category: "personality",
                        percentile: 0.921597878419718,
                        raw_score: 0.5551757680912048,
                        significant: true
                    },
                    {
                        trait_id: "facet_artistic_interests",
                        name: "Artistic interests",
                        category: "personality",
                        percentile: 0.9516608765268614,
                        raw_score: 0.7494190422920192,
                        significant: true
                    },
                    {
                        trait_id: "facet_emotionality",
                        name: "Emotionality",
                        category: "personality",
                        percentile: 0.5671507624951285,
                        raw_score: 0.6550900815788224,
                        significant: true
                    },
                    {
                        trait_id: "facet_imagination",
                        name: "Imagination",
                        category: "personality",
                        percentile: 0.9000860696366363,
                        raw_score: 0.7985382430791532,
                        significant: true
                    },
                    {
                        trait_id: "facet_intellect",
                        name: "Intellect",
                        category: "personality",
                        percentile: 0.7151965452489291,
                        raw_score: 0.6335672992946597,
                        significant: true
                    },
                    {
                        trait_id: "facet_liberalism",
                        name: "Authority-challenging",
                        category: "personality",
                        percentile: 0.8239189159854459,
                        raw_score: 0.5630904511028016,
                        significant: true
                    }
                ]
            },
            {
                trait_id: "big5_conscientiousness",
                name: "Conscientiousness",
                category: "personality",
                percentile: 0.3606121401931569,
                raw_score: 0.6114084736120003,
                significant: true,
                children: [{
                        trait_id: "facet_achievement_striving",
                        name: "Achievement striving",
                        category: "personality",
                        percentile: 0.20040948698269806,
                        raw_score: 0.6439166624584054,
                        significant: true
                    },
                    {
                        trait_id: "facet_cautiousness",
                        name: "Cautiousness",
                        category: "personality",
                        percentile: 0.24669524098840317,
                        raw_score: 0.4492373759453579,
                        significant: true
                    },
                    {
                        trait_id: "facet_dutifulness",
                        name: "Dutifulness",
                        category: "personality",
                        percentile: 0.39197964192368523,
                        raw_score: 0.6521862419791213,
                        significant: true
                    },
                    {
                        trait_id: "facet_orderliness",
                        name: "Orderliness",
                        category: "personality",
                        percentile: 0.8348406445972413,
                        raw_score: 0.5260428922504412,
                        significant: true
                    },
                    {
                        trait_id: "facet_self_discipline",
                        name: "Self-discipline",
                        category: "personality",
                        percentile: 0.4249990201667321,
                        raw_score: 0.5616444598579673,
                        significant: true
                    },
                    {
                        trait_id: "facet_self_efficacy",
                        name: "Self-efficacy",
                        category: "personality",
                        percentile: 0.6575902592340859,
                        raw_score: 0.7673743314438366,
                        significant: true
                    }
                ]
            },
            {
                trait_id: "big5_extraversion",
                name: "Extraversion",
                category: "personality",
                percentile: 0.08389523754195705,
                raw_score: 0.48945513710028,
                significant: true,
                children: [{
                        trait_id: "facet_activity_level",
                        name: "Activity level",
                        category: "personality",
                        percentile: 0.44673900142404765,
                        raw_score: 0.5335275281663443,
                        significant: true
                    },
                    {
                        trait_id: "facet_assertiveness",
                        name: "Assertiveness",
                        category: "personality",
                        percentile: 0.5758182457398059,
                        raw_score: 0.6536172486459514,
                        significant: true
                    },
                    {
                        trait_id: "facet_cheerfulness",
                        name: "Cheerfulness",
                        category: "personality",
                        percentile: 0.5539262075561538,
                        raw_score: 0.6226885188809879,
                        significant: true
                    },
                    {
                        trait_id: "facet_excitement_seeking",
                        name: "Excitement-seeking",
                        category: "personality",
                        percentile: 0.8895426459185158,
                        raw_score: 0.6555062642615235,
                        significant: true
                    },
                    {
                        trait_id: "facet_friendliness",
                        name: "Outgoing",
                        category: "personality",
                        percentile: 0.6309563191192118,
                        raw_score: 0.5772600216688084,
                        significant: true
                    },
                    {
                        trait_id: "facet_gregariousness",
                        name: "Gregariousness",
                        category: "personality",
                        percentile: 0.3565427567500776,
                        raw_score: 0.4344390358976184,
                        significant: true
                    }
                ]
            },
            {
                trait_id: "big5_agreeableness",
                name: "Agreeableness",
                category: "personality",
                percentile: 0.07442050213381884,
                raw_score: 0.6848072656454403,
                significant: true,
                children: [{
                        trait_id: "facet_altruism",
                        name: "Altruism",
                        category: "personality",
                        percentile: 0.6637070884376033,
                        raw_score: 0.7199147096364718,
                        significant: true
                    },
                    {
                        trait_id: "facet_cooperation",
                        name: "Cooperation",
                        category: "personality",
                        percentile: 0.604243215702617,
                        raw_score: 0.595315302235635,
                        significant: true
                    },
                    {
                        trait_id: "facet_modesty",
                        name: "Modesty",
                        category: "personality",
                        percentile: 0.30081065374731536,
                        raw_score: 0.42082781206659753,
                        significant: true
                    },
                    {
                        trait_id: "facet_morality",
                        name: "Uncompromising",
                        category: "personality",
                        percentile: 0.17765564051838328,
                        raw_score: 0.5821969519336744,
                        significant: true
                    },
                    {
                        trait_id: "facet_sympathy",
                        name: "Sympathy",
                        category: "personality",
                        percentile: 0.5784311879425881,
                        raw_score: 0.6710341929041029,
                        significant: true
                    },
                    {
                        trait_id: "facet_trust",
                        name: "Trust",
                        category: "personality",
                        percentile: 0.8388296372699087,
                        raw_score: 0.6265729937291071,
                        significant: true
                    }
                ]
            },
            {
                trait_id: "big5_neuroticism",
                name: "Emotional range",
                category: "personality",
                percentile: 0.024122338219587314,
                raw_score: 0.3918557625217266,
                significant: true,
                children: [{
                        trait_id: "facet_anger",
                        name: "Fiery",
                        category: "personality",
                        percentile: 0.4983265858080664,
                        raw_score: 0.5354861497883587,
                        significant: true
                    },
                    {
                        trait_id: "facet_anxiety",
                        name: "Prone to worry",
                        category: "personality",
                        percentile: 0.7728573150490871,
                        raw_score: 0.6451430565704332,
                        significant: true
                    },
                    {
                        trait_id: "facet_depression",
                        name: "Melancholy",
                        category: "personality",
                        percentile: 0.5103555290788693,
                        raw_score: 0.45008315234633833,
                        significant: true
                    },
                    {
                        trait_id: "facet_immoderation",
                        name: "Immoderation",
                        category: "personality",
                        percentile: 0.17422364879212043,
                        raw_score: 0.46455585204693717,
                        significant: true
                    },
                    {
                        trait_id: "facet_self_consciousness",
                        name: "Self-consciousness",
                        category: "personality",
                        percentile: 0.5782385756619148,
                        raw_score: 0.5571010654347476,
                        significant: true
                    },
                    {
                        trait_id: "facet_vulnerability",
                        name: "Susceptible to stress",
                        category: "personality",
                        percentile: 0.5497819022765329,
                        raw_score: 0.475592759963664,
                        significant: true
                    }
                ]
            }
        ],
        needs: [
        	{
                trait_id: "need_challenge",
                name: "Challenge",
                category: "needs",
                percentile: 0.18499330017368554,
                raw_score: 0.6915777067394456,
                significant: true
            },
            {
                trait_id: "need_closeness",
                name: "Closeness",
                category: "needs",
                percentile: 0.44907052502982736,
                raw_score: 0.7876790765262751,
                significant: true
            },
            {
                trait_id: "need_curiosity",
                name: "Curiosity",
                category: "needs",
                percentile: 0.26318649553093343,
                raw_score: 0.7999757587840699,
                significant: true
            },
            {
                trait_id: "need_excitement",
                name: "Excitement",
                category: "needs",
                percentile: 0.5026382039858545,
                raw_score: 0.6857301339097482,
                significant: true
            },
            {
                trait_id: "need_harmony",
                name: "Harmony",
                category: "needs",
                percentile: 0.5267407480031931,
                raw_score: 0.8115739270815172,
                significant: true
            },
            {
                trait_id: "need_ideal",
                name: "Ideal",
                category: "needs",
                percentile: 0.3319359195147522,
                raw_score: 0.670402701896123,
                significant: true
            },
            {
                trait_id: "need_liberty",
                name: "Liberty",
                category: "needs",
                percentile: 0.2686200493012025,
                raw_score: 0.7133979182649636,
                significant: true
            },
            {
                trait_id: "need_love",
                name: "Love",
                category: "needs",
                percentile: 0.28049438676518346,
                raw_score: 0.7403785329928084,
                significant: true
            },
            {
                trait_id: "need_practicality",
                name: "Practicality",
                category: "needs",
                percentile: 0.7441316218190618,
                raw_score: 0.7419494975468267,
                significant: true
            },
            {
                trait_id: "need_self_expression",
                name: "Self-expression",
                category: "needs",
                percentile: 0.43352043303674426,
                raw_score: 0.6692641117755822,
                significant: true
            },
            {
                trait_id: "need_stability",
                name: "Stability",
                category: "needs",
                percentile: 0.40361040380084806,
                raw_score: 0.726677948714454,
                significant: true
            },
            {
                trait_id: "need_structure",
                name: "Structure",
                category: "needs",
                percentile: 0.13737520630683275,
                raw_score: 0.6664836727365241,
                significant: true
            }
        ],
        values: [{
                trait_id: "value_conservation",
                name: "Conservation",
                category: "values",
                percentile: 0.26943684397093337,
                raw_score: 0.6377656408702819,
                significant: true
            },
            {
                trait_id: "value_openness_to_change",
                name: "Openness to change",
                category: "values",
                percentile: 0.5534128499365456,
                raw_score: 0.7894465011851532,
                significant: true
            },
            {
                trait_id: "value_hedonism",
                name: "Hedonism",
                category: "values",
                percentile: 0.4152003441509851,
                raw_score: 0.7245071382768076,
                significant: true
            },
            {
                trait_id: "value_self_enhancement",
                name: "Self-enhancement",
                category: "values",
                percentile: 0.4430885972063767,
                raw_score: 0.7000508118599805,
                significant: true
            },
            {
                trait_id: "value_self_transcendence",
                name: "Self-transcendence",
                category: "values",
                percentile: 0.0437173893815474,
                raw_score: 0.8051216197616464,
                significant: true
            }
        ],
        consumption_preferences: [{
                consumption_preference_category_id: "consumption_preferences_shopping",
                name: "Purchasing Preferences",
                consumption_preferences: [{
                        consumption_preference_id: "consumption_preferences_automobile_ownership_cost",
                        name: "Likely to be sensitive to ownership cost when buying automobiles",
                        score: 0.5
                    },
                    {
                        consumption_preference_id: "consumption_preferences_automobile_safety",
                        name: "Likely to prefer safety when buying automobiles",
                        score: 0
                    },
                    {
                        consumption_preference_id: "consumption_preferences_clothes_quality",
                        name: "Likely to prefer quality when buying clothes",
                        score: 0
                    },
                    {
                        consumption_preference_id: "consumption_preferences_clothes_style",
                        name: "Likely to prefer style when buying clothes",
                        score: 1
                    },
                    {
                        consumption_preference_id: "consumption_preferences_clothes_comfort",
                        name: "Likely to prefer comfort when buying clothes",
                        score: 1
                    },
                    {
                        consumption_preference_id: "consumption_preferences_influence_brand_name",
                        name: "Likely to be influenced by brand name when making product purchases",
                        score: 0.5
                    },
                    {
                        consumption_preference_id: "consumption_preferences_influence_utility",
                        name: "Likely to be influenced by product utility when making product purchases",
                        score: 1
                    },
                    {
                        consumption_preference_id: "consumption_preferences_influence_online_ads",
                        name: "Likely to be influenced by online ads when making product purchases",
                        score: 1
                    },
                    {
                        consumption_preference_id: "consumption_preferences_influence_social_media",
                        name: "Likely to be influenced by social media when making product purchases",
                        score: 1
                    },
                    {
                        consumption_preference_id: "consumption_preferences_influence_family_members",
                        name: "Likely to be influenced by family when making product purchases",
                        score: 0
                    },
                    {
                        consumption_preference_id: "consumption_preferences_spur_of_moment",
                        name: "Likely to indulge in spur of the moment purchases",
                        score: 1
                    },
                    {
                        consumption_preference_id: "consumption_preferences_credit_card_payment",
                        name: "Likely to prefer using credit cards for shopping",
                        score: 0
                    }
                ]
            },
            {
                consumption_preference_category_id: "consumption_preferences_health_and_activity",
                name: "Health & Activity Preferences",
                consumption_preferences: [{
                        consumption_preference_id: "consumption_preferences_eat_out",
                        name: "Likely to eat out frequently",
                        score: 0
                    },
                    {
                        consumption_preference_id: "consumption_preferences_gym_membership",
                        name: "Likely to have a gym membership",
                        score: 0
                    },
                    {
                        consumption_preference_id: "consumption_preferences_outdoor",
                        name: "Likely to like outdoor activities",
                        score: 0.5
                    }
                ]
            },
            {
                consumption_preference_category_id: "consumption_preferences_environmental_concern",
                name: "Environmental Concern Preferences",
                consumption_preferences: [{
                    consumption_preference_id: "consumption_preferences_concerned_environment",
                    name: "Likely to be concerned about the environment",
                    score: 0
                }]
            },
            {
                consumption_preference_category_id: "consumption_preferences_entrepreneurship",
                name: "Entrepreneurship Preferences",
                consumption_preferences: [{
                    consumption_preference_id: "consumption_preferences_start_business",
                    name: "Likely to consider starting a business in next few years",
                    score: 0
                }]
            },
            {
                consumption_preference_category_id: "consumption_preferences_movie",
                name: "Movie Preferences",
                consumption_preferences: [{
                        consumption_preference_id: "consumption_preferences_movie_romance",
                        name: "Likely to like romance movies",
                        score: 0
                    },
                    {
                        consumption_preference_id: "consumption_preferences_movie_adventure",
                        name: "Likely to like adventure movies",
                        score: 1
                    },
                    {
                        consumption_preference_id: "consumption_preferences_movie_horror",
                        name: "Likely to like horror movies",
                        score: 0
                    },
                    {
                        consumption_preference_id: "consumption_preferences_movie_musical",
                        name: "Likely to like musical movies",
                        score: 0
                    },
                    {
                        consumption_preference_id: "consumption_preferences_movie_historical",
                        name: "Likely to like historical movies",
                        score: 0
                    },
                    {
                        consumption_preference_id: "consumption_preferences_movie_science_fiction",
                        name: "Likely to like science-fiction movies",
                        score: 0
                    },
                    {
                        consumption_preference_id: "consumption_preferences_movie_war",
                        name: "Likely to like war movies",
                        score: 1
                    },
                    {
                        consumption_preference_id: "consumption_preferences_movie_drama",
                        name: "Likely to like drama movies",
                        score: 0
                    },
                    {
                        consumption_preference_id: "consumption_preferences_movie_action",
                        name: "Likely to like action movies",
                        score: 0
                    },
                    {
                        consumption_preference_id: "consumption_preferences_movie_documentary",
                        name: "Likely to like documentary movies",
                        score: 1
                    }
                ]
            },
            {
                consumption_preference_category_id: "consumption_preferences_music",
                name: "Music Preferences",
                consumption_preferences: [{
                        consumption_preference_id: "consumption_preferences_music_rap",
                        name: "Likely to like rap music",
                        score: 0.5
                    },
                    {
                        consumption_preference_id: "consumption_preferences_music_country",
                        name: "Likely to like country music",
                        score: 0
                    },
                    {
                        consumption_preference_id: "consumption_preferences_music_r_b",
                        name: "Likely to like R&B music",
                        score: 0
                    },
                    {
                        consumption_preference_id: "consumption_preferences_music_hip_hop",
                        name: "Likely to like hip hop music",
                        score: 0.5
                    },
                    {
                        consumption_preference_id: "consumption_preferences_music_live_event",
                        name: "Likely to attend live musical events",
                        score: 0
                    },
                    {
                        consumption_preference_id: "consumption_preferences_music_playing",
                        name: "Likely to have experience playing music",
                        score: 1
                    },
                    {
                        consumption_preference_id: "consumption_preferences_music_latin",
                        name: "Likely to like Latin music",
                        score: 0.5
                    },
                    {
                        consumption_preference_id: "consumption_preferences_music_rock",
                        name: "Likely to like rock music",
                        score: 0
                    },
                    {
                        consumption_preference_id: "consumption_preferences_music_classical",
                        name: "Likely to like classical music",
                        score: 0.5
                    }
                ]
            },
            {
                consumption_preference_category_id: "consumption_preferences_reading",
                name: "Reading Preferences",
                consumption_preferences: [{
                        consumption_preference_id: "consumption_preferences_read_frequency",
                        name: "Likely to read often",
                        score: 1
                    },
                    {
                        consumption_preference_id: "consumption_preferences_books_entertainment_magazines",
                        name: "Likely to read entertainment magazines",
                        score: 1
                    },
                    {
                        consumption_preference_id: "consumption_preferences_books_non_fiction",
                        name: "Likely to read non-fiction books",
                        score: 0
                    },
                    {
                        consumption_preference_id: "consumption_preferences_books_financial_investing",
                        name: "Likely to read financial investment books",
                        score: 0
                    },
                    {
                        consumption_preference_id: "consumption_preferences_books_autobiographies",
                        name: "Likely to read autobiographical books",
                        score: 1
                    }
                ]
            },
            {
                consumption_preference_category_id: "consumption_preferences_volunteering",
                name: "Volunteering Preferences",
                consumption_preferences: [{
                    consumption_preference_id: "consumption_preferences_volunteer",
                    name: "Likely to volunteer for social causes",
                    score: 0
                }]
            }
        ],
        warnings: [{
            warning_id: "WORD_COUNT_MESSAGE",
            message: "There were 100 words in the input. We need a minimum of 600, preferably 1,200 or more, to compute statistically significant estimates"
        }]
    }
}