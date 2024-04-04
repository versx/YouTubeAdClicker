function showNotification(title, message) {
  // Show a notification after options are saved
  const noti = chrome.notifications.create('optionsSaved', {
    type: 'basic',
    iconUrl: '/assets/icons/notification.png', // Make sure you have an icon.png in your extension directory
    title,
    message,
    priority: 2
  });
  console.log('noti:', noti);
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
