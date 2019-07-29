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
	let out = ''
	for(let i = 0; i < 10; i ++) {
		out += Math.floor(Math.random()*10).toString()
	}
	return out
}

async function scrapeData() {
	// Wait for profile picture
	while(!document.querySelector('._6q-tv')) {
		await new Promise(resolve => setTimeout(resolve, 100))	
	}
	// Get User data
	const username = document.querySelector('._7UhW9').textContent;
	const profilePicture = document.querySelector('._6q-tv').getAttribute('src')
	const posts = document.querySelectorAll('._9AhH0');
	// console.log({length: posts.length})
	const quantity = posts.length > 12 ? 12 : posts.length;
	let data = [];

	// Loop through posts
	for(let i = 0; i < quantity; i ++) {
		data[i] = {	imageUrl: '',	caption: '', likes: 0, postedOn: ''	};
		posts[i].click();
		// wait for post to load
		while(!document.querySelector('article.M9sTE')) {
			await new Promise(resolve => setTimeout(resolve, 200));
		}
		// safety margin
		await wait(100);
		
		let temp;
		// check if image or video
		if(document.querySelector('article.M9sTE').querySelector('.KL4Bh')) {
			temp = document.querySelector('article.M9sTE')
				.querySelector('.KL4Bh')
				.firstElementChild
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
		data[i].postedOn = document.querySelector('._1o9PC').getAttribute('datetime')
		// close modal
		document.querySelector('.ckWGn').click()
		await wait(100);
	}
	// Object to be sent to the backend
	const key = generateKey()
	const payload = {
		username,
		key,
		profilePicture,
		posts: data,
	}
	console.log(payload)
	let response = await fetch('http://localhost:3000/', {
		method: 'POST',
		headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
		body: JSON.stringify(payload)
	});
	chrome.runtime.sendMessage({openTab: `?user=${username}&key=${key}`});
};

scrapeData();