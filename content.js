function clickAd() {
  //const YouTubeSkipAdButtonSelector = '.ytp-ad-skip-button-modern.ytp-button';
  const YouTubeSkipAdButtonSelector = '.ytp-ad-skip-button-modern';
  const skipButton = document.querySelector(YouTubeSkipAdButtonSelector);
  if (!skipButton) {
    //console.log('No skip ad button found yet...');
    //console.log('Skip ad button not ready yet...');
    return;
  }

  setTimeout(() => {
    console.log('Skip ad button found, clicking...');
    skipButton.click();
  }, 500);

  // Increment the total number of ads clicked
  chrome.storage.sync.get(['totalAdsClicked'], function(data) {
    chrome.storage.sync.set({ totalAdsClicked: data.totalAdsClicked + 1 });
  });

  // Check for 'Skip' ad button again
  setTimeout(clickAd, 1000);
}

const observer = new MutationObserver(() => {
  const isAdShowing = document.querySelector('.ad-showing');
  if (isAdShowing) {
    clickAd();
  }
}).observe(document.querySelector('body'), {
  characterData: true,
  childList: true,
  attributes: true,
  subtree: true,
});
console.log('YouTube Ad Clicker extension loaded');

/*
<button class="ytp-ad-skip-button-modern ytp-button">
  <div class="ytp-ad-text ytp-ad-skip-button-text-centered ytp-ad-skip-button-text" id="ad-text:5v" style="">
    Skip
  </div>
</button>
*/