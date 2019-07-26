let startButton = document.getElementById('startButton');

// chrome.storage.sync.get('color', function(data) {
// 	startButton.style.backgroundColor = data.color;
// 	startButton.setAttribute('value', data.color);
// });

startButton.onclick = function(element) {

	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{
				code: `
					async function wait(ms) {
						return new Promise(resolve => {
							setTimeout(resolve, ms);
						});
					};
					let data = [];
					const posts = document.querySelectorAll('._9AhH0');
					const quantity = posts.length > 10 ? 10 : posts.length;

					async function clickPosts() {
						for(let i = 0; i < quantity; i ++) {
							posts[i].click();
							data[i] = {
								imageUrl: '',
								caption: '',
							};
							let temp;
							
							// wait for load
							while(!document.querySelector('article.M9sTE')) {
								await new Promise(resolve => setTimeout(resolve, 200));
							}
							// safety margin
							await wait(100);
							
							// to ignore videos
							if(document.querySelector('article.M9sTE').querySelector('.KL4Bh')) {
								temp = document.querySelector('article.M9sTE')
									.querySelector('.KL4Bh')
									.firstElementChild
									.getAttribute('srcset')
									.split(',')[0]
								for(let j = 0; j < temp.length - 5; j ++) {
									data[i].imageUrl += temp[j]
								}
							}

							if(document.querySelector('.C4VMK')) {
								data[i].caption = document.querySelector('.C4VMK').querySelector('span').textContent;
							}

							console.log(data[i])
							document.querySelector('.ckWGn').click()
							await wait(150);
						}
					};

					clickPosts();
				`
			}
		);
	});
};