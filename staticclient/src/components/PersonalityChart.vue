<template>
	<canvas id="personalityChart" width="100" height="100" style="display: unset;"></canvas>
</template>

<script>
const Chart = require('chart.js');

export default {
  props: ['personality'],
	data() {
		return {
			user: {
				personalities: [
					{
						"trait_id": "big5_openness",
						"name": "Openness",
						"category": "personality",
						"percentile": 0.3941718839705052,
						"raw_score": 0.7400806342560351,
						"significant": true,
						"children": [
							{
								"trait_id": "facet_adventurousness",
								"name": "Adventurousness",
								"category": "personality",
								"percentile": 0.9234025501089325,
								"raw_score": 0.5556180361801135,
								"significant": true
							},
							{
								"trait_id": "facet_artistic_interests",
								"name": "Artistic interests",
								"category": "personality",
								"percentile": 0.9684078097835663,
								"raw_score": 0.7593774959657091,
								"significant": true
							},
							{
								"trait_id": "facet_emotionality",
								"name": "Emotionality",
								"category": "personality",
								"percentile": 0.9086814879506695,
								"raw_score": 0.7025267977313553,
								"significant": true
							},
							{
								"trait_id": "facet_imagination",
								"name": "Imagination",
								"category": "personality",
								"percentile": 0.9876436600435987,
								"raw_score": 0.8464116751920001,
								"significant": true
							},
							{
								"trait_id": "facet_intellect",
								"name": "Intellect",
								"category": "personality",
								"percentile": 0.8819906749058344,
								"raw_score": 0.6620969731812696,
								"significant": true
							},
							{
								"trait_id": "facet_liberalism",
								"name": "Authority-challenging",
								"category": "personality",
								"percentile": 0.9719982213735968,
								"raw_score": 0.6124801252174286,
								"significant": true
							}
						]
					},
					{
						"trait_id": "big5_conscientiousness",
						"name": "Conscientiousness",
						"category": "personality",
						"percentile": 0.059900630700211566,
						"raw_score": 0.5554961078874368,
						"significant": true,
						"children": [
							{
								"trait_id": "facet_achievement_striving",
								"name": "Achievement striving",
								"category": "personality",
								"percentile": 0.09759573229423107,
								"raw_score": 0.6198156088547797,
								"significant": true
							},
							{
								"trait_id": "facet_cautiousness",
								"name": "Cautiousness",
								"category": "personality",
								"percentile": 0.12590530810654382,
								"raw_score": 0.42013425052352665,
								"significant": true
							},
							{
								"trait_id": "facet_dutifulness",
								"name": "Dutifulness",
								"category": "personality",
								"percentile": 0.5511222860550513,
								"raw_score": 0.6620472433955141,
								"significant": true
							},
							{
								"trait_id": "facet_orderliness",
								"name": "Orderliness",
								"category": "personality",
								"percentile": 0.19091504746851884,
								"raw_score": 0.4655100339417559,
								"significant": true
							},
							{
								"trait_id": "facet_self_discipline",
								"name": "Self-discipline",
								"category": "personality",
								"percentile": 0.10330735805656177,
								"raw_score": 0.5104922585132105,
								"significant": true
							},
							{
								"trait_id": "facet_self_efficacy",
								"name": "Self-efficacy",
								"category": "personality",
								"percentile": 0.5739114402367993,
								"raw_score": 0.7596530080750388,
								"significant": true
							}
						]
					},
					{
						"trait_id": "big5_extraversion",
						"name": "Extraversion",
						"category": "personality",
						"percentile": 0.025620723661231526,
						"raw_score": 0.4640146164173957,
						"significant": true,
						"children": [
							{
								"trait_id": "facet_activity_level",
								"name": "Activity level",
								"category": "personality",
								"percentile": 0.6624661047750506,
								"raw_score": 0.5618294182076036,
								"significant": true
							},
							{
								"trait_id": "facet_assertiveness",
								"name": "Assertiveness",
								"category": "personality",
								"percentile": 0.4181239308402307,
								"raw_score": 0.633726016829387,
								"significant": true
							},
							{
								"trait_id": "facet_cheerfulness",
								"name": "Cheerfulness",
								"category": "personality",
								"percentile": 0.5057595282240844,
								"raw_score": 0.6186228372390358,
								"significant": true
							},
							{
								"trait_id": "facet_excitement_seeking",
								"name": "Excitement-seeking",
								"category": "personality",
								"percentile": 0.933147614623838,
								"raw_score": 0.6671896866260524,
								"significant": true
							},
							{
								"trait_id": "facet_friendliness",
								"name": "Outgoing",
								"category": "personality",
								"percentile": 0.47520313524738544,
								"raw_score": 0.5573691358150918,
								"significant": true
							},
							{
								"trait_id": "facet_gregariousness",
								"name": "Gregariousness",
								"category": "personality",
								"percentile": 0.2861726108236276,
								"raw_score": 0.4243170406628323,
								"significant": true
							}
						]
					},
					{
						"trait_id": "big5_agreeableness",
						"name": "Agreeableness",
						"category": "personality",
						"percentile": 0.001926483434617321,
						"raw_score": 0.6273095365091501,
						"significant": true,
						"children": [
							{
								"trait_id": "facet_altruism",
								"name": "Altruism",
								"category": "personality",
								"percentile": 0.8937975572442383,
								"raw_score": 0.7488345166946366,
								"significant": true
							},
							{
								"trait_id": "facet_cooperation",
								"name": "Cooperation",
								"category": "personality",
								"percentile": 0.4501446534271279,
								"raw_score": 0.5718403164423265,
								"significant": true
							},
							{
								"trait_id": "facet_modesty",
								"name": "Modesty",
								"category": "personality",
								"percentile": 0.33890496409021775,
								"raw_score": 0.42645362666092823,
								"significant": true
							},
							{
								"trait_id": "facet_morality",
								"name": "Uncompromising",
								"category": "personality",
								"percentile": 0.1435158401138955,
								"raw_score": 0.5755760981319853,
								"significant": true
							},
							{
								"trait_id": "facet_sympathy",
								"name": "Sympathy",
								"category": "personality",
								"percentile": 0.8727753358073806,
								"raw_score": 0.7069934948635619,
								"significant": true
							},
							{
								"trait_id": "facet_trust",
								"name": "Trust",
								"category": "personality",
								"percentile": 0.9196818034244761,
								"raw_score": 0.6435987799347616,
								"significant": true
							}
						]
					},
					{
						"trait_id": "big5_neuroticism",
						"name": "Emotional range",
						"category": "personality",
						"percentile": 0.11113747789660056,
						"raw_score": 0.3985640155518385,
						"significant": true,
						"children": [
							{
								"trait_id": "facet_anger",
								"name": "Fiery",
								"category": "personality",
								"percentile": 0.5348489471603913,
								"raw_score": 0.5404986084760042,
								"significant": true
							},
							{
								"trait_id": "facet_anxiety",
								"name": "Prone to worry",
								"category": "personality",
								"percentile": 0.8828039172550446,
								"raw_score": 0.6752064342115179,
								"significant": true
							},
							{
								"trait_id": "facet_depression",
								"name": "Melancholy",
								"category": "personality",
								"percentile": 0.6953557990989929,
								"raw_score": 0.4808102929937127,
								"significant": true
							},
							{
								"trait_id": "facet_immoderation",
								"name": "Immoderation",
								"category": "personality",
								"percentile": 0.7158617780961352,
								"raw_score": 0.5225225852962952,
								"significant": true
							},
							{
								"trait_id": "facet_self_consciousness",
								"name": "Self-consciousness",
								"category": "personality",
								"percentile": 0.6917585831451687,
								"raw_score": 0.5730685275197637,
								"significant": true
							},
							{
								"trait_id": "facet_vulnerability",
								"name": "Susceptible to stress",
								"category": "personality",
								"percentile": 0.8306165792329057,
								"raw_score": 0.5285683075384132,
								"significant": true
							}
						]
					}
				],
			}
		}
	},
	methods: {
		initPersonalityChart() {
      new Chart(document.getElementById('personalityChart'), {
        type: 'radar',
        data: {
          labels: this.user.personalities.map(personality => personality.name),
          datasets: [
            {
              fill: true,
              backgroundColor: "rgba(111,148,205,0.7)",
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: this.user.personalities.map(personality => personality.percentile * 100)
            }
          ]
				},
				options: {
         legend: {
            display: false
         },
				},
      });
    },
	},
	mounted() {
		this.initPersonalityChart();
	},
}
</script>

<style>

</style>
