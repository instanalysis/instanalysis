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
      localStorage.setItem('savedUsers', JSON.stringify([]))
      console.log("clearSavedUsers at background.js")
    }
  }
);

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (request.saveUser) {
      console.log(request.saveUser)
    }
  });