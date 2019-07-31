const clientUrl = 'http://localhost:8081';
// const clientUrl = 'http://www.instanalysis.online';
const serverUrl = 'http://server.instanalysis.online';

chrome.runtime.onInstalled.addListener((message, callback) => {

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'www.instagram.com'},
        })
      ],
      actions: [
        new chrome.declarativeContent.ShowPageAction()
      ]
    }]);
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.openTab) {
      chrome.tabs.create({
        url: `${clientUrl}/${request.openTab}`
      })
    }

    if(request.hitServer) {
      (async function hitBackend() {
        try {
          let response = await fetch(`${serverUrl}/analysis`, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(request.hitServer)
          });
        } catch(err) {
          console.log(err)
        }
      })();
    }

    if (request.clearSavedUsers) {
      chrome.storage.local.set({savedUsers:[]}, function(){
        console.log('cleared saved users')
      })
    }

    if (request.getSavedUsers) {
      return new Promise ((resolve, reject) => {
        chrome.storage.local.get(['savedUsers'], function(result){
          console.log('currentSaved:', result.savedUsers)
          resolve(result.savedUsers)
          // console.log('payload:',request.getSavedUsers)
          // result.savedUsers.forEach(user => {
          //   let option = document.createElement("option")
          //   let text = document.createTextNode(user.username)
          //   option.appendChild(text)
          //   request.getSavedUsers.appendChild(option)
          // })
        })
      })
    }
  }
);

// chrome.storage.sync.set({key: value}, function() {
//          console.log('Value is set to ' + value);
//        });
      
//        chrome.storage.sync.get(['key'], function(result) {
//          console.log('Value currently is ' + result.key);
//        });

//event from instanalysis client
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (request.saveUser) {
      console.log(request.saveUser)
      // if user has no ibm profile data (less than 100 words)
      if (request.saveUser.username){
        chrome.storage.local.get(['savedUsers'], function(result){
          let currentSaved = result.savedUsers
          currentSaved.push(request.saveUser)
          chrome.storage.local.set({savedUsers: currentSaved}, function(){
            console.log('saved user', request.saveUser.username)
          })
        })
      }
    }
  });