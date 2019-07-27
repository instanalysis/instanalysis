const startButton = document.getElementById('startButton');
const loopThrough = require('./content.js')

startButton.onclick = function(element) {

	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,loopThrough
		);
	});
};