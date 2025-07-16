chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || !tab.url) return;

  const twitchRegex = /^https:\/\/www\.twitch\.tv\/([a-zA-Z0-9_]+)(\?.*)?$/;
  const match = tab.url.match(twitchRegex);
  if (!match) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon128.png',
      title: 'Twitch DocPiP Popout',
      message: 'Not a valid Twitch stream page.'
    });
    return;
  }

  // Send message to content script to trigger PiP
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (channel) => {
      window.postMessage({ type: 'START_DOC_PIP', channel }, '*');
    },
    args: [match[1]],
  });
});