
async function loopThrough(){
	const username = $("._7UhW9").text()
	console.log(username)
	const postLinks = $(".v1Nh3").find("a")
	let posts = []

	// for (let i =0; i < postLinks.length; i++){
	for (let i =0; i < 2; i++){
		const linkElement = postLinks[i]

		linkElement.click()
		let postDetail = await processPost(username)
		posts.push(postDetail)
		console.log(postDetail)
	}
}

async function processPost(username){
	await timeMeOut(2000) //mau diganti ke window.on("load")
	// wait for load

	let imageURL = getImageURL()
	// console.log({imageURL})
	//".C4VMK"
	let captionText = cleanCaption(username)
	// console.log({captionText})
	let likeCount = await getLikes()
	// console.log({likeCount})
	return new Promise((resolve, reject) => {
		$(".ckWGn").click()
		resolve({
			imageURL:imageURL, 
			caption:captionText, 
			likes:likeCount
		})
	})
}

function getImageURL(){
	let url = $(".M9sTE").find(".KL4Bh").children(":first").attr("src")
	if (!url){
		// url = $(".M9sTE > div:first > div:first > div:first > div:first > div:first > div:first > img:first").attr("src")
		// console.log($(".M9sTE > div:first > div:first > div:first > div:first > div:first > div:first > img:first").innerHtml)
		url = $("._5wCQW").find(".tWeCl").attr("poster")
		// console.log("is a video", url)
	}
	return url
}

function cleanCaption(username){
	if ($(".C4VMK > h2:first").text().startsWith(username)) {
		let caption = $(".C4VMK > span:first").text()
		// console.log({caption})
		return caption
	} else { 
		return ''
	}
}

async function getLikes(){
	let likeStrArr = $(".Nm9Fw").text().split(" ")
	if (!likeStrArr || likeStrArr.length < 2) {
		$(".vcOH2").trigger("click")
		likeStrArr = $(".vJRqr").text().split(" ")
	}
	console.log({likeStrArr})
	if (likeStrArr.length < 2) return 0

	let likeCount = Number(likeStrArr[likeStrArr.length-2].split(",").join(""))
	if (likeStrArr.length > 2) {
		//count "and" and "," in likeStrArr
		likeStrArr.forEach(word => {
			if (word==='and' || word===','){
				likeCount++
			}
		})
	}
	return likeCount
}

async function timeMeOut(ms){
	return new Promise ((resolve, reject) => {
		setTimeout(resolve, ms)
	})
}


async function waitForEl(selector, maxTimeWait) {
	let currentTimeWait = 0
	while ($(selector)===null) {
		await timeMeOut(100)
		currentTimeWait += 100
		if (currentTimeWait == maxTimeWait) return null
	}
	return $(selector)
};

loopThrough()