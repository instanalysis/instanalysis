
// const doc = $(document)
// const ele = $(document.documentElement)

// console.log('ele was printed')
// console.log({html:ele.html})

// const postLinks = $(".v1Nh3").find("a")
// console.log(postLinks)

// for (let i =0; i < postLinks.length; i++){
// 	console.log(i+1, postLinks[i].href)
// }
// console.log(doc.text())
// console.log('doc.text was printed')

async function loopThrough(){
	const username = $("._7UhW9").text()
	console.log(username)
	const postLinks = $(".v1Nh3").find("a")
	let posts = []

	for (let i =0; i < postLinks.length; i++){
		// await timeMeOut(1000) //testing await inside async function
		const linkElement = postLinks[i]
		// const link = postLinks[i].href
		// console.log(i+1, link)
		linkElement.click()
		let postDetail = await processPost(username)
		posts.push(postDetail)
		console.log(postDetail)
	}
}

async function processPost(username){
	await timeMeOut(2000) //mau diganti ke window.on("load")
	// await $(window).on("load")
	return new Promise((resolve, reject) => {
		// let imageURL = waitForEl(".ckWGn", () => {
		// 	return $(".KL4Bh").find("img").attr('src')
		// })
		let imageURL = $(".KL4Bh").find("img").attr("src")
		// console.log({imageURL})
		//".C4VMK"
		let captionText = cleanCaption(username)
		// console.log({captionText})
		let likeCount = cleanLikes($(".Nm9Fw").text().split(" "))
		// console.log({likeCount})
		$(".ckWGn").click()
		resolve({
			imageURL:imageURL, 
			caption:captionText, 
			likes:likeCount
		})
	})
}

function cleanCaption(username){
	// _6lAjh
	//C4VMK
	if ($(".C4VMK").find("h2").text().startsWith(username)) {
		return $(".C4VMK").find("span").text()
	} else { 
		return ''
	}
}

function cleanLikes(likeStrArr){
	if (!likeStrArr || likeStrArr.length < 2) return 0
	let likeCount = Number(likeStrArr[likeStrArr.length-2])
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


function waitForEl(selector, callback) {
	console.log($(selector).length)

  if ($(selector).length) {
    callback();
  } else {
    setTimeout(function() {
      waitForEl(selector, callback);
    }, 100);
  }
};


loopThrough()