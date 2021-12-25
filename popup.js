document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('button');
    button.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            chrome.storage.local.get(['started'], function(result) {
                if (result.started) {
                    button.innerText = "Start testing";
                    chrome.storage.local.set({started: false}, function() {});
                } else {
                    button.innerText = "Stop testing";
                    var array = document.getElementById("lines").value.split("\n");
                    var url = document.getElementById("url").value;
                    chrome.storage.local.set({started: true, index: 0, lines: array, url: url}, function() {
                        chrome.tabs.create({ url: url });
                    });
                }
            });
        });
    }, false);
}, false);
