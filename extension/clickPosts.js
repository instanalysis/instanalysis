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
		await new Promise(resolve => setTimeout(resolve, 100))
		time += 100
		// console.log(time)
	}
	return document.querySelector(element)
}

async function scrapeData(limit) {
	// Wait for username
	await waitForElement('._7UhW9', 3000)
	// Wait for profile picture
	await waitForElement('._6q-tv', 3000)
	// Wait for posts
	await waitForElement('.v1Nh3 > a', 3000)
	// Get User data
	const username = document.querySelector('._7UhW9').textContent;
	const profilePicture = document.querySelector('._6q-tv').getAttribute('src')

	window.scrollTo(0, 0)
	await wait(500)
	let posts = document.querySelectorAll('.v1Nh3 > a')

	let data = [];
	// Loop through posts
	let post = posts[0] //first post
	for(let i = 0; i < limit; i ++) {
		console.log(`Image number ${i + 1}`)
		data[i] = {	imageUrl: '',	caption: '', likes: 0, postedOn: ''	};
		post.click();
		// wait for post to load
		await waitForElement('article.M9sTE', 3000)
		let timetaken = 0
		// wait for image or video to load
		while(!document.querySelector('.KL4Bh') && !document.querySelector('._5wCQW') && timetaken < 5000){
			// console.log('waiting for image or video to load')
			await new Promise(resolve => setTimeout(resolve, 100))
			timetaken += 100
			// console.log(timetaken)
		}
		
		let temp;
		// check if image or video
		if(document.querySelector('article.M9sTE').querySelector('.KL4Bh')) {
			await waitForElement('.FFVAD', 2000)
			let img = document.querySelector('.FFVAD')

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
					.querySelector('img')
					.getAttribute('src')
			} catch(err) {
				console.log('No alt img for video')
			}
		}

		await waitForElement('.C4VMK', 3000)
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
		data[i].postedOn = document.querySelector('._1o9PC').getAttribute('datetime')

		//prepare to click next post 
		post = await waitForElement('.coreSpriteRightPaginationArrow', 3000)
		if (!post) i = limit //break loop if no more posts
	}
	// Object to be sent to the backend
	const key = generateKey()
	const payload = {
		username,
		key,
		profilePicture,
		userimage: profilePicture,
		posts: data,
	}
	console.log(payload)

	// chrome.runtime.sendMessage({hitServer: payload});

	// chrome.runtime.sendMessage({openTab: `?user=${username}&key=${key}`});
};

chrome.storage.local.get(['postlimit'], ({ postlimit }) => {
	scrapeData(postlimit)
});