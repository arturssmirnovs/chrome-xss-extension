setInterval(function () {
    chrome.storage.local.get(['started', 'lines', 'index', 'url'], function(result) {
        if (result.started) {
            if (result.lines) {

                let index = parseInt(result.index) ? parseInt(result.index) : 0;
                let payload = result.lines[index];
                let url = result.url+payload;

                chrome.tabs.query({active: true}, function(t) {
                    chrome.tabs.sendMessage(t[0].id, {action: "redirect", url: url}, function(response) {
                        if (index === result.lines.length) {
                            chrome.storage.local.set({started: false});
                            chrome.storage.local.set({lines: null});
                            chrome.storage.local.set({index: 0});
                        } else {
                            chrome.storage.local.set({index: index+1});
                        }
                    });
                });
            }
        }
    });
}, 1500);

