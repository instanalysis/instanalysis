parseContent(5000)

async function parseContent(maxTimeTaken){
	let timeTaken = 0
	let scrollNav = await waitForEl("._4emnV", 2000)
	console.log(scrollNav.length)
	while (scrollNav.length && timeTaken < maxTimeTaken){
		// console.log("can scroll down")
		await scrollDown()
		scrollNav = await waitForEl("._4emnV", 2000)
		timeTaken += 500
	}
	loopThrough()
}


async function scrollDown(){
	$("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
	// console.log("scrolling down")
	await timeMeOut(500)
}

async function loopThrough(){
	// console.log("looping through posts..")
	await waitForEl("._7UhW9",2000)
	const username = $("._7UhW9").text()
	// console.log(username)
	await waitForEl("._6q-tv",2000)
	const userimage = $("._6q-tv").attr("src")
	// console.log(userimage)
	await waitForEl(".v1Nh3",2000)
	const postLinks = $(".v1Nh3").find("a")
	let posts = []

	for (let i =0; i < postLinks.length; i++){
	// for (let i =0; i < 2; i++){
		const linkElement = postLinks[i]

		linkElement.click()
		let postDetail = await processPost(username)
		posts.push(postDetail)
		// console.log(postDetail)
	}
	
	const resultingData = {
		username: username,
		userimage: userimage,
		posts: posts
	}

	console.log({resultingData})
	return resultingData
}

async function processPost(username){
	// await timeMeOut(2000) //mau diganti ke window.on("load")
	// wait for load
	await waitForEl(".ckWGn", 2000) //x close button
	await waitForEl(".M9sTE", 2000) //article container
	await waitForEl(".C4VMK", 2000) //caption
	await waitForEl(".KL4Bh", 1000)
	await waitForEl(".tWeCl", 1000) //video
	await waitForEl("._1o9PC", 1000) //datetime

	let imageURL = getImageURL()
	// console.log({imageURL})
	//".C4VMK"
	let captionText = cleanCaption(username)
	// console.log({captionText})
	let likeCount = await getLikes()
	// console.log({likeCount})
	let date = getDateFromPost()
	return new Promise((resolve, reject) => {
		$(".ckWGn").click()
		resolve({
			imageURL:imageURL, 
			caption:captionText, 
			likes:likeCount,
			date: date
		})
	})
}

function getDateFromPost(){
	const date = $("._1o9PC").attr("datetime")
	// console.log(date)
	return date
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
	// console.log({likeStrArr})
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
	// console.log("waiting for", selector)
	// console.log($(selector))
	let currentTimeWait = 0
	while ($(selector)===undefined || $(selector).length===0) {
		await timeMeOut(100)
		currentTimeWait += 100
		// console.log(currentTimeWait)
		if (currentTimeWait == maxTimeWait) return true
	}
	return $(selector)
};