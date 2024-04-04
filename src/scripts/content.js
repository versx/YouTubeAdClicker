function run(delayBeforeClick = 500, clickInterval = 1000) {
  setTimeout(() => {
    clickAd(delayBeforeClick, clickInterval);
  }, clickInterval);
}

function clickAd(delayBeforeClick = 500, clickInterval = 1000) {
  //const YouTubeSkipAdButtonSelector = '.ytp-ad-skip-button-modern.ytp-button';
  const YouTubeSkipAdButtonSelector = '.ytp-ad-skip-button-modern.ytp-button';
  const skipButton = document.querySelector(YouTubeSkipAdButtonSelector);
  if (!skipButton) {
    //console.log('Skip ad button not ready yet...');
    //run(delayBeforeClick, clickInterval);
    return;
  }

  const video = document.querySelector('video');
  if (!video) {
    //console.log('video not found...');
    //run(delayBeforeClick, clickInterval);
    return;
  }

  const canClickSkipButton = skipButton.checkVisibility({ visible: true });
  if (!canClickSkipButton) {
    console.log('Ad is still active, waiting...');
    //run(delayBeforeClick, clickInterval);
    return;
  }

  setTimeout(() => {
    console.log('Skip ad button found, clicking...');
    skipButton.click();

    // Increment the total number of ads clicked
    chrome.storage.sync.get(['totalAdsClicked'], function(data) {
      chrome.storage.sync.set({ totalAdsClicked: data.totalAdsClicked + 1 });
    });
  }, delayBeforeClick);

  // Check for 'Skip' ad button again
  //run(delayBeforeClick, clickInterval);
}

chrome.runtime.onInstalled?.addListener(function(details) {
  if (details.reason !== 'install') {
    return;
  }

  chrome.storage.sync.set({
    enabled: true,
    totalAdsClicked: 0,
    installDate: Date.now(),
  });
});

const ClickInterval = 1000;
const DelayBeforeClick = 1500;
const observer = new MutationObserver(() => {
  const isAdShowing = document.querySelector('.ad-showing');
  if (isAdShowing) {
    clickAd(DelayBeforeClick, ClickInterval);
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