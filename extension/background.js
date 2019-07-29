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
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if(request.openTab) {
      chrome.tabs.create({
        url: `http://localhost:8080/${request.openTab}`
      })
    }
    if(request.hitServer) {
      console.log(request.hitServer)
      async function hitBackend() {
        let response = await fetch('http://server.instanalysis.online/analysis', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request.hitServer.payload)
        });
        console.log('response', response)
      }
      hitBackend()      
    }
  }
);