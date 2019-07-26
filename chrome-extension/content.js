
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
	const postLinks = $(".v1Nh3").find("a")
	let posts = []

	for (let i =0; i < postLinks.length; i++){
		// await timeMeOut(1000) //testing await inside async function
		const linkElement = postLinks[i]
		// const link = postLinks[i].href
		// console.log(i+1, link)
		linkElement.click()
		let postDetail = await processPost()
		posts.push(postDetail)
		console.log(postDetail)
	}
}

async function processPost(){
	await timeMeOut(2000)
	return new Promise((resolve, reject) => {
		let imageURL = $(".KL4Bh").find("img").attr('src')
		// console.log({imageURL})
		let captionText = $(".C4VMK").find("span").text()
		// console.log({captionText})
		let likeCount = $(".Nm9Fw").find("button").text()
		// console.log({likeCount})
		$(".ckWGn").click()
		resolve({
			imageURL:imageURL, 
			caption:captionText, 
			likes:likeCount
		})
	})
}

async function timeMeOut(ms){
	return new Promise ((resolve, reject) => {
		setTimeout(resolve, ms)
	})
}

loopThrough()