// function mockSavedUsers(){
//   chrome.storage.local.get(['savedUsers'], function(result){
//     let currentSaved = result.savedUsers
//     currentSaved.push('one')
//     currentSaved.push('two')
//     chrome.storage.local.set({savedUsers: currentSaved}, function(){
//     })
// 	reloadSavedUsers()
//   })
// }
// mockSavedUsers()

chrome.storage.local.set({postlimit: 10})

window.onload = function(e) {
	reloadSavedUsers()
}

const numberOfPosts = document.querySelector('input#myRange')
const postLimitSelector = document.getElementById('postlimit')
numberOfPosts.oninput = function(e) {
	postLimitSelector.value = e.target.value; 
	chrome.storage.local.set({postlimit: e.target.value})
}

const savedUserSelector = document.getElementById('savedUserSelector')
const compareButton = document.getElementById('compareButton')
savedUserSelector.onclick = function(e){
	// selectedToCompare
	if (savedUserSelector.value === '-') {
		compareButton.disabled = true
	} else {
		compareButton.disabled = false
	}
	chrome.storage.local.set({selectedToCompare: savedUserSelector.value})
	console.log(savedUserSelector.value)
}

const clearButton = document.getElementById('clearButton')
clearButton.onclick = function(e) {
	// chrome.runtime.sendMessage({clearSavedUsers: true});
	chrome.storage.local.set({savedUsers:[]}, function(){
		console.log('cleared saved users')
		reloadSavedUsers()
	})
}

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

const startButton = document.getElementById('startButton');
startButton.onclick = function(element) {
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
};

function reloadSavedUsers(){
	savedUserSelector.innerHTML = '<option>-</option>'
	chrome.storage.local.get(['savedUsers'], function(result){
		const storageUsers = result.savedUsers
		console.log({storageUsers})
		storageUsers.forEach( user => {
			let option = document.createElement("option")
			let text = document.createTextNode(user)
			option.appendChild(text)
			savedUserSelector.appendChild(option)
		})
	})
	chrome.storage.local.set({selectedToCompare: savedUserSelector.value})
	
	compareButton.disabled = true
}
