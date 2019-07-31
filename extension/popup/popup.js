chrome.storage.local.set({postlimit: 10})

const numberOfPosts = document.querySelector('input#myRange')
numberOfPosts.oninput = function(e) {
	document.getElementById('postlimit').value = e.target.value; 
	chrome.storage.local.set({postlimit: e.target.value})
}

const savedUserSelector = document.getElementById('savedUserSelector')
const clearButton = document.getElementById('clearButton')
clearButton.onclick = function(e) {
	// chrome.runtime.sendMessage({clearSavedUsers: true});
	chrome.storage.local.set({savedUsers:[]}, function(){
		console.log('cleared saved users')
		reloadSavedUsers()
	})
}

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
}

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

window.onload = function(e) {
	reloadSavedUsers()
}


const compareButton = document.getElementById('compareButton')
compareButton.onclick = function (argument) {
	// chrome.tabs.query({
	// 	active: true,
	// 	currentWindow: true
	// }, function(tabs) {
	// 	setTimeout(() => {
	// 		window.close()
	// 	}, 200)
	// 	chrome.tabs.executeScript(
	// 		tabs[0].id,
	// 		{ file: 'clickPosts.js' }
	// 	);
	// });
	let userOne = {username: savedUserSelector.value} //ambil selected username dari combobox
	console.log({userOne})
	// chrome.storage.local.get(['savedUsers'], function(result){
	// 	const storageUsers = result.savedUsers
	// 	for (let i =0; i< storageUsers.length; i++){
	// 		let user = storageUsers[i]
	// 		if (user.username === userOne.username){
	// 			userOne.ibm = user.ibm // get user data
	// 			i = storageUsers.length
	// 		}
	// 	}
	// 	// we have our first user userOne and our current open page
	// 	// send ke server
	// })

	// we have our first user userOne and our current open page
	// send ke server
}

const startButton = document.getElementById('startButton');
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
