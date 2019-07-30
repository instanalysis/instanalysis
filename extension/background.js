const clientUrl = 'http://localhost:8080';
const serverUrl = 'http://server.instanalysis.online';

chrome.runtime.onInstalled.addListener((message, callback) => {
  chrome.storage.sync.set({color: '#3aa757'});

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