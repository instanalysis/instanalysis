// const extensionId = 'njalbdhpniekifijjefichllkdjeecll'
async function wait(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
};

async function getLikes() {
	let likeStrArr;
	if(document.querySelector('.Nm9Fw')) {
		likeStrArr = document.querySelector('.Nm9Fw').textContent.split(' ');
	} else {
		// click view count to get like count tooltip
		document.querySelector('.vcOH2').click()
		await wait(50)
		likeStrArr = document.querySelector('.vJRqr').textContent.split(' ');
	}
	// second to last element with commas removed, coerced into type: Number
	let likes = +(likeStrArr[likeStrArr.length-2].split(',').join(''));
	if (likeStrArr.length > 2) {
		likeStrArr.forEach(word => {
			if(word === 'and' || word === ',') {
				likes ++;
			}
		})
	}
	return likes;
}

function generateKey() {
	return Math.random().toString(16).substring(4, 14)
}

async function waitForElement(element, maxTime){
	// console.log('waiting for', element)
	let time = 0
	while(!document.querySelector(element) && time < maxTime){
		await wait(100)
		time += 100
		// console.log(time)
	}
	return document.querySelector(element)
}

// For progress bar
let barWidth;
let barLimit;
let dots = 0;
function progressBar() {
	let msg = document.createElement('div');
	msg.innerHTML = `<div class="lmess"><span id="loadingdots">Gathering Data</span><div>`
	msg.className = 'scrapemessage'
	
	document.body.appendChild(msg)
	let dotSpan = document.querySelector('#loadingdots')
	setInterval(() => {
		dots = (dots + 1) % 6
		let str = 'Gathering Data'
		for(let i = 0; i < dots; i ++) {
			str += ' .'
		}
		dotSpan.innerHTML = str;
	}, 160)

	let bar = document.createElement('div')
	bar.className = 'progbar-container'
	
	let progress = document.createElement('div')
	progress.className = 'progbar-bar'

	msg.appendChild(bar)
	bar.appendChild(progress)

	barWidth = document.querySelector('.progbar-container').offsetWidth
	barLimit = parseInt(document.querySelector('.-nal3').textContent)
}

async function scrapeData(limit, compareUsername) {
	// Wait for username
	await waitForElement('._7UhW9', 3000)
	// Wait for profile picture
	await waitForElement('._6q-tv', 500)
	await waitForElement('.be6sR', 500)
	// Wait for posts
	await waitForElement('.v1Nh3 > a', 3000)
	// Get User data
	const username = document.querySelector('._7UhW9').textContent;

	let profilePicture = document.querySelector('._6q-tv') || document.querySelector('.be6sR');
	profilePicture = profilePicture.getAttribute('src');

	window.scrollTo(0, 0)
	await wait(500)
	let posts = document.querySelectorAll('.v1Nh3 > a')

	let data = [];
	// Loop through posts
	let post = posts[0] //first post
	let fullBar = limit <= barLimit ? limit : barLimit
	console.log({
		limit, barLimit, fullBar
	})
	for(let i = 0; i < limit; i ++) {
		document.querySelector('.progbar-bar').style.width = ((i + 1) / fullBar) * barWidth + 'px'

		console.log(`Image number ${i + 1}`)
		data[i] = {	imageUrl: '',	caption: '', likes: 0, date: ''	};
		post.click();
		// wait for post to load
		// @STEF: This block of code causes error on line 89 
		// (document.querySelector('article.M9sTE') will sometimes return null on videos
		// -----> below ----->
				// await waitForElement('article.M9sTE', 3000)
				// let timetaken = 0
				// // wait for image or video to load
				// while(!document.querySelector('.KL4Bh') && !document.querySelector('._5wCQW') && timetaken < 5000){
				// 	// console.log('waiting for image or video to load')
				// 	await new Promise(resolve => setTimeout(resolve, 100))
				// 	timetaken += 100
				// }
		// <-----
		//		
		while(!document.querySelector('article.M9sTE')) {
			await new Promise(resolve => setTimeout(resolve, 200));
		}

		let timetaken = 0
		// wait for image or video to load
		while(!document.querySelector('.KL4Bh') && !document.querySelector('._5wCQW') && timetaken < 5000){
			// console.log('waiting for image or video to load')
			await wait(100)
			timetaken += 100
			// console.log(timetaken)
		}
		// safety margin
		await wait(100);
		
		let temp;
		// check if image or video
		if(document.querySelector('article.M9sTE').querySelector('.KL4Bh')) {
			await waitForElement('.FFVAD', 2000)
			let img = document.querySelector('article.M9sTE').querySelector('.KL4Bh').querySelector('.FFVAD')
			// console.log(img)
			await wait(200)

			temp = img
				.getAttribute('srcset')
				.split(',')[0]
			for(let j = 0; j < temp.length - 5; j ++) {
				data[i].imageUrl += temp[j]
			}
		} else {
			// get alt image of video
			try {
				data[i].imageUrl = document.querySelector('article.M9sTE')
					.querySelector('._5wCQW')
					.querySelector('video')
					.getAttribute('poster')
			} catch(err) {
				console.log('No alt img for video')
			}
		}

		await waitForElement('.C4VMK', 800)
		if(document.querySelector('.C4VMK')) {
			// check if first comment is by the correct user
			if(document.querySelector('.C4VMK').querySelector('.FPmhX.TlrDj').textContent === username) {
				// ignore verified checkmark span
				data[i].caption = document.querySelector('.C4VMK').querySelector('span:not(.Szr5J)').textContent
			}
		}
		// likes
		data[i].likes = await getLikes()
		// date
		await waitForElement('._1o9PC', 2000)
		data[i].date = document.querySelector('._1o9PC').getAttribute('datetime')

		//prepare to click next post 
		post = await waitForElement('.coreSpriteRightPaginationArrow', 1200)
		//break loop if no more posts
		if (!post) {
			i = limit;
		}
	}
	// close the post
	const closeButton = await waitForElement('.ckWGn', 1500)
	closeButton.click()

	setTimeout(() => {
		document.querySelector('.scrapemessage').style.display = 'none'
	}, 200)

	// Object to be sent to the backend
	const pass = generateKey();
	const payload = {
		username,
		pass,
		profilePicture,
		userimage: profilePicture,
		posts: data,
	}
	console.log(payload)

	// return [{hitServer: payload}, {openTab: `?user=${username}&key=${key}`}]
	if (compareUsername){
		chrome.runtime.sendMessage({hitServer: payload});
		chrome.runtime.sendMessage({openTab: `match?user=${username}&key=${pass}&match=${compareUsername}`});
	} else {
		chrome.runtime.sendMessage({hitServer: payload});
		chrome.runtime.sendMessage({openTab: `?user=${username}&key=${pass}`});
	}
};

progressBar();
chrome.storage.local.get(['selectedToCompare'], ({selectedToCompare}) => {
	if (selectedToCompare && selectedToCompare != '-'){
		//analyze, save, and compare
		chrome.storage.local.get(['postlimit'], ({ postlimit }) => {
			scrapeData(postlimit, selectedToCompare)
		});
	} else {
		//analyze and save
		chrome.storage.local.get(['postlimit'], ({ postlimit }) => {
			scrapeData(postlimit, false)
		});
	}
});
