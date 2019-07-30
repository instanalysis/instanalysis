chrome.storage.local.set({postlimit: 10})

let numberOfPosts = document.querySelector('input#myRange')
numberOfPosts.oninput = function(e) {
	document.getElementById('postlimit').value = e.target.value; 
	chrome.storage.local.set({postlimit: e.target.value})
}

let clearButton = document.getElementById('clearButton')
clearButton.onclick = function(e) {
	chrome.storage.local.set({savedUsers: []})
	console.log("clear savedUsers")
}

let savedUserSelector = document.getElementById('savedUserSelector')
savedUserSelector.onload = function(e) {
	const storageUsers = chrome.local.get(['savedUsers'], ({ savedUsers }) => {
		savedUsers.forEach( user => {
			let option = document.createElement("option")
			let text = document.createTextNode(user.username)
			option.appendChild(text)
			savedUserSelector.appendChild(option)
		})
	})
	console.log({storageUsers})
}

let compareButton = document.getElementById('compareButton')

let startButton = document.getElementById('startButton');
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

	// const storageUsers = chrome.local.get(['savedUsers'], ({ savedUsers }) => {
	// 	savedUsers.forEach( user => {
	// 		let option = document.createElement("option")
	// 		let text = document.createTextNode(user.username)
	// 		option.appendChild(text)
	// 		savedUserSelector.appendChild(option)
	// 	})
	// })
};