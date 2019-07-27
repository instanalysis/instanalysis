async function wait(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
};
let data = [];
const posts = document.querySelectorAll('._9AhH0');
let username = document.querySelector('._7UhW9').textContent;
const quantity = posts.length > 10 ? 10 : posts.length;

async function clickPosts() {
	for(let i = 0; i < 5; i ++) {
		posts[i].click();
		data[i] = {	imageUrl: '',	caption: ''	};
		let temp;
		
		// wait for post to load
		while(!document.querySelector('article.M9sTE')) {
			await new Promise(resolve => setTimeout(resolve, 200));
		}
		// safety margin
		await wait(100);
		
		// if statement to ignore videos
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
				console.log('No video img alt')
			}
		}

		if(document.querySelector('.C4VMK')) {
			if(document.querySelector('.C4VMK').querySelector('.FPmhX.TlrDj').textContent === username) {
				data[i].caption = document.querySelector('.C4VMK').querySelector('span:not(.Szr5J)').textContent
			} else {
				console.log('username doesnt match on first comment')
			}
		}

		console.log(data[i])
		document.querySelector('.ckWGn').click()
		await wait(100);
	}
};

clickPosts();