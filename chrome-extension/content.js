
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

	for (let i =0; i < postLinks.length; i++){
		// await timeMeOut(1000) //testing await inside async function
		const link = postLinks[i].href
		console.log(i+1, link)
	}
}

async function timeMeOut(ms){
	return new Promise ((resolve, reject) => {
		setTimeout(resolve, ms)
	})
}

loopThrough()