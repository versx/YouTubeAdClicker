const toggleSwitch = document.getElementById('enabled');
const optionsButton = document.getElementById('openOptions');
const adClicksElement = document.getElementById('totalAdsClicked');
const installDate = document.getElementById('installDate');

function load() {
  optionsButton.addEventListener('click', openOptionsPage);

  toggleSwitch.addEventListener('change', function() {
    chrome.storage.sync.set({'enabled': toggleSwitch.checked}, saveOptions);
  });

  // Load the current state
  chrome.storage.sync.get(['enabled', 'totalAdsClicked', 'installDate'], function(data) {
    console.log('popup data:', data);
    toggleSwitch.checked = data.enabled;
    adClicksElement.textContent = (data.totalAdsClicked || 0).toLocaleString();
    installDate.textContent = data.installDate
      ? new Date(data.installDate).toLocaleDateString()
      : 'Unknown';
  });
  
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    adClicksElement.textContent = changes.totalAdsClicked?.newValue || 0;
  });
}

function saveOptions() {
  const enabled = document.getElementById('enabled').checked;
  chrome.storage.sync.set({ enabled }, () => {
    const enabledText = toggleSwitch.checked ? 'enabled' : 'disabled';
    showNotification('YouTube Ad-Clicker', `YouTube Ad clicker has been ${enabledText}.`);
    console.log('Options saved.');
  });
}

function openOptionsPage() {
  console.log('Opening options page...');
  if (chrome.runtime.openOptionsPage) {
    // New way to open options pages, if supported (Chrome 42+).
    chrome.runtime.openOptionsPage();
  } else {
    // Reasonable fallback.
    window.open(chrome.runtime.getURL('options/options.html'));
  }
}

load();