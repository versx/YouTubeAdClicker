function showNotification(title, message) {
  // Show a notification after options are saved
  chrome.notifications.create('optionsSaved', {
    type: 'basic',
    iconUrl: '/assets/icons/notification.png', // Make sure you have an icon.png in your extension directory
    title,
    message,
    priority: 2
  });
}
