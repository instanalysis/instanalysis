const clientUrl = 'http://localhost:8080';
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
    console.log(request)
    if (request.saveUser) {
      let curUser = request.saveUser // {username: 'nama', startData: {}, ibmData: {} }
      console.log(curUser)
      // if user has no ibm profile data (less than 100 words)
      if (curUser.username){
        chrome.storage.local.get(['savedUsers'], function(result){
          let usersArr = result.savedUsers

          if(!usersArr) {
            chrome.storage.local.set({savedUsers: [curUser.username]})
          } else {
            // add to array if username is new
            if (!usersArr.includes(curUser.username)){
              usersArr.push(curUser.username)
            }
  
            //save updated array
            chrome.storage.local.set({savedUsers: usersArr}, function(){
              console.log('saved user', curUser.username)
            })
          }
        })
      }
    }
  });