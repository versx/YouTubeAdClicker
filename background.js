const CheckTabInterval = 5 * 1000; // 5 seconds

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.debug(`Tab Updated: ${tabId}, status: ${changeInfo.status}`);
  if (changeInfo.status !== 'complete') {
    return;
  }

  if (!tab.url || !tab.url.includes('youtube.com/watch')) {
    return;
  }

  console.log('Found YouTube page in tab:', tabId);

  setTimeout(() => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js'],
    });
  }, CheckTabInterval);
});

console.log('YouTube Ad Clicker started...');
