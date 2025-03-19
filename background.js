chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fillForm") {
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            function: fillForm
        });
    }
});
