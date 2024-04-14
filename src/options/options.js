function saveOptions() {
  const enabled = document.getElementById('enabled').checked;
  const delayBeforeClick = document.getElementById('delayBeforeClick').value;
  const skipButtonSelector = document.getElementById('skipButtonSelector').value;
  const checkInterval = document.getElementById('checkInterval').value;

  chrome.storage.sync.set({
    enabled,
    delayBeforeClick,
    skipButtonSelector,
    checkInterval,
  }, () => {
    showNotification('YouTube Ad-Clicker', 'Your settings have been saved successfully.');
    console.log('Options saved.');
  });
}

function setDefaultOptions() {
  chrome.storage.sync.get([
    'enabled',
    'delayBeforeClick',
    'clickInterval',
    'totalAdsClicked',
    'installDate',
  ], (data) => {
    if (!data.installDate) {
      console.log('setting default options:', JSON.stringify(data));
      chrome.storage.sync.set({
        enabled: true,
        delayBeforeClick: 500,
        clickInterval: 1000,
        totalAdsClicked: 0,
        installDate: Date.now(),
      });
    }
  });
}

function restoreOptions() {
  setDefaultOptions();

  chrome.storage.sync.get({
    enabled: true,
    delayBeforeClick: 500,
    //skipButtonSelector: '.ytp-ad-skip-button-modern.ytp-button',
    skipButtonSelector: '.ytp-ad-skip-button-modern',
    checkInterval: 1000,
  }, (items) => {
    console.log('restoreOptions:', items);
    document.getElementById('enabled').checked = items.enabled;
    document.getElementById('delayBeforeClick').value = items.delayBeforeClick;
    document.getElementById('skipButtonSelector').value = items.skipButtonSelector;
    document.getElementById('checkInterval').value = items.checkInterval;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('saveOptions').addEventListener('click', saveOptions);
