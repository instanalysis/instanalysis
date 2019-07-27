document.querySelector('input#myRange').onchange = function(e) {
	document.getElementById('postlimit').value = e.target.value; 
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
		chrome.tabs.executeScript(
			tabs[0].id,
			{ file: 'clickPosts.js' }
		);
	});
};