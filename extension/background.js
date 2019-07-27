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
        url: `http://m43max.xyz/${request.openTab}`
      })
    }
  }
);