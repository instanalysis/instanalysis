const apiKey = process.env.googleApiKey
const googleTranslate = require('google-translate')(apiKey);

const englishwords = `It was on the corner of the street that he noticed the first sign of something peculiar -- a cat reading a map. For a second, Mr. Dursley didn't realize what he had seen -- then he jerked his head around to look again. There was a tabby cat standing on the corner of Privet Drive, but there wasn't a map in sight. What could he have been thinking of? It must have been a trick of the light. Mr. Dursley blinked and stared at the cat. It stared back. As Mr. Dursley drove around the corner and up the road, he watched the cat in his mirror. It was now reading the sign that said Privet Drive -- no, looking at the sign; cats couldn't read maps or signs. Mr. Dursley gave himself a little shake and put the cat out of his mind. As he drove toward town he thought of nothing except a large order of drills he was hoping to get that day.
But on the edge of town, drills were driven out of his mind by something else. As he sat in the usual morning traffic jam, he couldn't help noticing that there seemed to be a lot of strangely dressed people about. People in cloaks. Mr. Dursley couldn't bear people who dressed in funny clothes -- the getups you saw on young people! He supposed this was some stupid new fashion. He drummed his fingers on the steering wheel and his eyes fell on a huddle of these weirdos standing quite close by. They were whispering excitedly together. Mr. Dursley was enraged to see that a couple of them weren't young at all; why, that man had to be older than he was, and wearing an emerald-green cloak! The nerve of him! But then it struck Mr. Dursley that this was probably some silly stunt -- these people were obviously collecting for something. . . yes, that would be it. The traffic moved on and a few minutes later, Mr. Dursley arrived in the Grunnings parking lot, his mind back on drills.
Mr. Dursley always sat with his back to the window in his office on the ninth floor. If he hadn't, he might have found it harder to concentrate on drills that morning. He didn't see the owls swooping past in broad daylight, though people down in the street did; they pointed and gazed open-mouthed as owl after owl sped overhead. Most of them had never seen an owl even at nighttime. Mr. Dursley, however, had a perfectly normal, owl-free morning. He yelled at five different people. He made several important telephone calls and shouted a bit more. He was in a very good mood until lunchtime, when he thought he'd stretch his legs and walk across the road to buy himself a bun from the bakery. `

const indowords=`Para penonton telah memadati stadion sepakbola itu.
Hari ini, sejumlah wisudawan mengikuti acara wisuda tahun ini.
Para siswa telah berkumpul di lapangan sekolah guna mengikuti upacara bendera.
Sejumlah pemuda berpartisipasi menjadi panitia kurban tahun ini.`

const chinesewords = `
	很晚了。
	他，一个人坐着。
	桌上是空酒瓶子。
	他和她分手有十个小时了。
	他只觉得夜很长, 也很凉。。。
	而她，正坐在火车上，想着他们分手的下午。
	不记得他们为什么争吵。
	可是他们都喊出了”分手”两个字。
	就这样，他 们 以 分 手 结 束 了 三 年 的爱 情。`

async function translateToEnglish(req, res, next) {
	//userdata should be req.body.data
	console.log('dalam function')
	// let userdata = req.body.data

    for (let i = 0; i< userdata.posts.length; i++) {
   		const post = userdata.posts[i]
		post.caption = await detectAndTranslate(post.caption)
 	}

 	req.body.data = userdata

	next()
}

const userdata = {
        username: 'viryse',
        posts: [
            {
                imageURL: 'https://cbsnews1.cbsistatic.com/hub/i/2018/11/06/0c1af1b8-155a-458e-b105-78f1e7344bf4/2018-11-06t054310z-1334124005-rc1be15a8050-rtrmadp-3-people-sexiest-man.jpg',
                caption: 'Unplug and unwind',
                likes: 2842,
                date: '2017'
            },
            {
                imageURL: 'https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg',
                caption: 'Kalau senen bisa seru, kenapa nggak? #kenapaya?',
                likes: 2369,
                date:'2017'
            },
            {
                imageURL: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                caption: 'Clubstyle ✌️ #fxdc #clubstyle #dyna',
                likes: 2369,
                date:'2017'
            }
        ]
    } 
// testTranslate(userdata)

async function testTranslate(userdata){
   for (let i = 0; i< userdata.posts.length; i++) {
   		const post = userdata.posts[i]
   		console.log("here")
		post.caption = await detectAndTranslate(post.caption)
		console.log("and here")
 	}

 	console.log(userdata)
 	return userdata
}

async function detectAndTranslate(tobetranslated){
	console.log({tobetranslated})
	let result = tobetranslated
	return new Promise ((resolve,reject) => {
		googleTranslate.detectLanguage(tobetranslated, async function(err, detection) {
		  console.log("detectedLanguage", detection.language)
		  if (detection === undefined) resolve(tobetranslated) //catch undetected languages

		  const detectedLanguage = detection.language

		  if (detectedLanguage !== 'en') {
		  	console.log("translating from", detectedLanguage)
		  	const translatedText = await translate(tobetranslated)
		  	resolve(translatedText)
		  } else {
		  	console.log("not translated because language is", detectedLanguage)
		  	resolve(tobetranslated)
		  }
		})
	})
}

async function translate(text){
	console.log("translate", text)
	return new Promise ((resolve, reject) => {
		googleTranslate.translate(text, 'en', function(err, translation) {
		  		console.log("translated text:", translation.translatedText)
		  		resolve(translation.translatedText);
		    })
	})
}

module.exports = translateToEnglish