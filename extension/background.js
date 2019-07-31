// const clientUrl = 'http://localhost:8081';
const clientUrl = 'http://www.instanalysis.online';
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
      let curUser = request.saveUser // {username: 'nama', startData: {}, ibmData: {} }
      console.log(curUser)
      // if user has no ibm profile data (less than 100 words)
      if (curUser.username){
        chrome.storage.local.get(['savedUsers'], function(result){
          let currentSaved = result.savedUsers
          let newUser = true
          // if user was already saved, use old saved data
          for (let i = 0; i < currentSaved.length; i++){
            if (currentSaved[i] === curUser.username){
              newUser = false
              // currentSaved[i] = curUser
            }
          }
          // if user is new, push to saved users array
          if (newUser) currentSaved.push(curUser.username)

          //save updated array
          chrome.storage.local.set({savedUsers: currentSaved}, function(){
            console.log('saved user', curUser.username)
          })
        })
      }
    }
  });