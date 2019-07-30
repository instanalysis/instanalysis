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

async function waitForMore(currentPosts) {
	window.scrollTo(0, document.body.scrollHeight);
	await wait(800);
	if(currentPosts.length === document.querySelectorAll('._9AhH0').length) {
		console.log('Loading is slow')
		await wait(800);
	}
	return document.querySelectorAll('._9AhH0')
}

function generateKey() {
	return Math.random().toString(16).substring(4, 14)
}

async function scrapeData(limit) {
	// Wait for profile picture
	while(!document.querySelector('._6q-tv')) {
		await new Promise(resolve => setTimeout(resolve, 100))	
	}
	// Get User data
	const username = document.querySelector('._7UhW9').textContent;
	const profilePicture = document.querySelector('._6q-tv').getAttribute('src')
	let posts = document.querySelectorAll('._9AhH0');

	if(limit > 24) {
		posts = await waitForMore(posts);
		await wait(1000);
	}
	if(limit > 36) {
		await waitForMore(posts);
		await wait(1250);
		window.scrollTo(0, 0);
		posts = document.querySelectorAll('._9AhH0');
	}

	const quantity = posts.length < limit ? posts.length : limit;
	console.log({quantity})
	let data = [];
	// Loop through posts
	for(let i = 0; i < quantity; i ++) {
		console.log(`Image number ${i + 1}`)
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

{/* <div class="sk-folding-cube">
  <div class="sk-cube1 sk-cube"></div>
  <div class="sk-cube2 sk-cube"></div>
  <div class="sk-cube4 sk-cube"></div>
  <div class="sk-cube3 sk-cube"></div>
</div>

.sk-folding-cube {
  margin: 20px auto;
  width: 40px;
  height: 40px;
  position: relative;
  -webkit-transform: rotateZ(45deg);
          transform: rotateZ(45deg);
}

.sk-folding-cube .sk-cube {
  float: left;
  width: 50%;
  height: 50%;
  position: relative;
  -webkit-transform: scale(1.1);
      -ms-transform: scale(1.1);
          transform: scale(1.1); 
}
.sk-folding-cube .sk-cube:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333;
  -webkit-animation: sk-foldCubeAngle 2.4s infinite linear both;
          animation: sk-foldCubeAngle 2.4s infinite linear both;
  -webkit-transform-origin: 100% 100%;
      -ms-transform-origin: 100% 100%;
          transform-origin: 100% 100%;
}
.sk-folding-cube .sk-cube2 {
  -webkit-transform: scale(1.1) rotateZ(90deg);
          transform: scale(1.1) rotateZ(90deg);
}
.sk-folding-cube .sk-cube3 {
  -webkit-transform: scale(1.1) rotateZ(180deg);
          transform: scale(1.1) rotateZ(180deg);
}
.sk-folding-cube .sk-cube4 {
  -webkit-transform: scale(1.1) rotateZ(270deg);
          transform: scale(1.1) rotateZ(270deg);
}
.sk-folding-cube .sk-cube2:before {
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s;
}
.sk-folding-cube .sk-cube3:before {
  -webkit-animation-delay: 0.6s;
          animation-delay: 0.6s; 
}
.sk-folding-cube .sk-cube4:before {
  -webkit-animation-delay: 0.9s;
          animation-delay: 0.9s;
}
@-webkit-keyframes sk-foldCubeAngle {
  0%, 10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
            transform: perspective(140px) rotateX(-180deg);
    opacity: 0; 
  } 25%, 75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
            transform: perspective(140px) rotateX(0deg);
    opacity: 1; 
  } 90%, 100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
            transform: perspective(140px) rotateY(180deg);
    opacity: 0; 
  } 
}

@keyframes sk-foldCubeAngle {
  0%, 10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
            transform: perspective(140px) rotateX(-180deg);
    opacity: 0; 
  } 25%, 75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
            transform: perspective(140px) rotateX(0deg);
    opacity: 1; 
  } 90%, 100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
            transform: perspective(140px) rotateY(180deg);
    opacity: 0; 
  }
} */}