function saveOptions() {
  const enabled = document.getElementById('enabled').checked;
  const delayBeforeClick = document.getElementById('delayBeforeClick').value;
  const skipButtonSelector = document.getElementById('skipButtonSelector').value;
  const checkInterval = document.getElementById('checkInterval').value;
  
  chrome.storage.local.set({
    enabled,
    delayBeforeClick,
    skipButtonSelector,
    checkInterval,
  }, () => {
    showNotification('YouTube Ad-Clicker', 'Your settings have been saved successfully.');
    console.log('Options saved.');
  });
}

function restoreOptions() {
  chrome.storage.local.get({
    enabled: true,
    delayBeforeClick: 1000,
    skipButtonSelector: '.ytp-ad-skip-button-modern.ytp-button',
    checkInterval: 1000,
  }, (items) => {
    document.getElementById('enabled').checked = items.enabled;
    document.getElementById('delayBeforeClick').value = items.delayBeforeClick;
    document.getElementById('skipButtonSelector').value = items.skipButtonSelector;
    document.getElementById('checkInterval').value = items.checkInterval;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('saveOptions').addEventListener('click', saveOptions);
