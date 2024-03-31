function clickAd() {
  const YouTubeSkipAdButtonSelector = '.ytp-ad-skip-button-modern.ytp-button';
  const skipButton = document.querySelector(YouTubeSkipAdButtonSelector);
  if (!skipButton) {
    console.log('No skip ad button found yet...');
    return;
  }

  console.log('Skip ad button found, clicking...');
  // Click the 'Skip' ad button after a short delay
  // to give the ad time to finish playing.
  skipButton.click();

  //setTimeout(() => {
  // Increment the total number of ads clicked
  chrome.storage.sync.get({ totalAdsClicked: 0 }, function(data) {
    chrome.storage.sync.set({ totalAdsClicked: data.totalAdsClicked + 1 });
  });
  //}, 2 * 1000);

  // Check for 'Skip' ad button again
  setTimeout(clickAd, 1000);
}

clickAd();
console.log('YouTube Ad Clicker extension loaded');

/*
<button class="ytp-ad-skip-button-modern ytp-button">
  <div class="ytp-ad-text ytp-ad-skip-button-text-centered ytp-ad-skip-button-text" id="ad-text:5v" style="">
    Skip
  </div>
</button>
*/
