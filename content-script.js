chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'redirect') {
        window.location.href = message.url;
    }
    return true
});