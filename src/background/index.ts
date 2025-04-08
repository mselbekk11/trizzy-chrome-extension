import { createClerkClient } from '@clerk/chrome-extension/background'

const publishableKey = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error('Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.development file')
}

// Register the side panel
chrome.runtime.onInstalled.addListener(() => {
  // Configure the side panel
  if (chrome.sidePanel) {
    // Set options for the side panel
    chrome.sidePanel.setOptions({
      enabled: true,
      path: 'sidepanel.html'
    }).catch(error => console.error("Error setting side panel options:", error));

    // Configure the behavior to open on action click
    chrome.sidePanel.setPanelBehavior({
      openPanelOnActionClick: true
    }).catch(error => console.error("Error setting panel behavior:", error));
  }
});

// Add a context menu to open the side panel
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'openSidePanel',
    title: 'Open Trizzy Panel',
    contexts: ['all']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openSidePanel' && tab?.windowId) {
    // Open the side panel in the current window
    chrome.sidePanel.open({ windowId: tab.windowId }).catch(error => console.error("Error opening side panel:", error));
  }
});

// Use `createClerkClient()` to create a new Clerk instance
// and use `getToken()` to get a fresh token for the user
async function getToken() {
  const clerk = await createClerkClient({
    publishableKey,
  })

  // If there is no valid session, then return null. Otherwise proceed.
  if (!clerk.session) {
    return null
  }

  // Return the user's session
  return await clerk.session?.getToken()
}

// Create a listener to listen for messages from content scripts
// It must return true, in order to keep the connection open and send a response later.
// NOTE: A runtime listener cannot be async.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // This example sends the token back to the content script
  // but you could also use the token to perform actions on behalf of the user
  getToken()
    .then((token) => sendResponse({ token }))
    .catch((error) => {
      console.error('[Background service worker] Error:', JSON.stringify(error))
      // If there is no token then send a null response
      sendResponse({ token: null })
    })
  return true // REQUIRED: Indicates that the listener responds asynchronously.
})