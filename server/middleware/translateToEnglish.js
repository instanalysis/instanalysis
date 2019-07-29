const apiKey = process.env.googleApiKeyBrowser
const googleTranslate = require('google-translate')(apiKey);

async function translateToEnglish(req, res, next) {
	//userdata should be in req.body
	let {username, userimage, posts} = req.body
	let userdata = {
		username: username,
		userimage: userimage,
		posts: posts
	}
	console.log('dalam function translateToEnglish')

    for (let i = 0; i< userdata.posts.length; i++) {
   		const post = userdata.posts[i]
		post.caption = await detectAndTranslate(post.caption)
 	}

 	req.body = userdata

	next()
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
	console.log("translating... ", text)
	return new Promise ((resolve, reject) => {
		googleTranslate.translate(text, 'en', function(err, translation) {
		  		console.log("translated text:", translation.translatedText)
		  		resolve(translation.translatedText);
		    })
	})
}

module.exports = translateToEnglish