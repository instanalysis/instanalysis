chrome.storage.local.set({postlimit: 10})

let numberOfPosts = document.querySelector('input#myRange')
numberOfPosts.oninput = function(e) {
	document.getElementById('postlimit').value = e.target.value; 
	chrome.storage.local.set({postlimit: e.target.value})
}

let clearButton = document.getElementById('clearButton')
clearButton.onclick = function(e) {
	console.log("clear savedUsers")
	chrome.runtime.sendMessage({clearSavedUsers: true});
}

let savedUserSelector = document.getElementById('savedUserSelector')
window.onload = function(e) {
	
	chrome.storage.local.get(['savedUsers'], function(result){
		const storageUsers = result.savedUsers
		console.log({storageUsers})
		storageUsers.forEach( user => {
			let option = document.createElement("option")
			let text = document.createTextNode(user.username)
			option.appendChild(text)
			savedUserSelector.appendChild(option)
		})
	})
}

let compareButton = document.getElementById('compareButton')
compareButton.onclick = function (argument) {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		setTimeout(() => {
			window.close()
		}, 200)
		chrome.tabs.executeScript(
			tabs[0].id,
			{ file: 'clickPosts.js' }
		);
	});
}

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

	// const storageUsers = JSON.parse(localStorage.getItem('savedUsers'))
	// console.log(storageUsers)

	// const storageUsers = chrome.local.get(['savedUsers'], ({ savedUsers }) => {
	// 	savedUsers.forEach( user => {
	// 		let option = document.createElement("option")
	// 		let text = document.createTextNode(user.username)
	// 		option.appendChild(text)
	// 		savedUserSelector.appendChild(option)
	// 	})
	// })
};
