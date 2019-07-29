chrome.storage.local.set({postlimit: 10})

document.querySelector('input#myRange').oninput = function(e) {
	document.getElementById('postlimit').value = e.target.value; 
	chrome.storage.local.set({postlimit: e.target.value})
}

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
		setTimeout(() => {
			window.close()
		}, 400)
		chrome.tabs.executeScript(
			tabs[0].id,
			{ file: 'clickPosts.js' }
		);
	});
};