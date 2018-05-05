console.log('Load background for mastoandon');

function getBrowser() {
  try {
    return browser;
  } catch (err) {
    return chrome;
  }
}

function tabsQuery(query) {
  return new Promise(function (resolv, reject) {
    try {
      let querying = getBrowser().tabs.query(query);
      if (!querying) {
        getBrowser().tabs.query(query, resolv);
        return;
      }
      querying.then(resolv).catch(reject);
    } catch (err) {
      try {
        getBrowser().tabs.query(query, resolv);
      } catch (err) {
        reject('browser.tabs.query unsupported!');
      }
    }
  });
}

function tabsExecuteScript(tabId, code) {
  return new Promise(function (resolv, reject) {
    try {
      let executing = getBrowser().tabs.executeScript(tabId, code);
      if (!executing) {
        getBrowser().tabs.executeScript(tabId, code, resolv);
        return;
      }
      executing.then(resolv).catch(reject);
    } catch (err) {
      try {
        getBrowser().tabs.executeScript(tabId, code, resolv);
      } catch (err) {
        reject('browser.tabs.executeScript unsupported!');
      }
    }
  });
}

function pageActionGetTitle(query) {
  return new Promise(function (resolv, reject) {
    try {
      let executing = getBrowser().pageAction.getTitle(query);
      if (!executing) {
        getBrowser().pageAction.getTitle(query, resolv);
        return;
      }
      executing.then(resolv).catch(reject);
    } catch (err) {
      try {
        getBrowser().pageAction.getTitle(query, resolv);
      } catch (err) {
        reject('browser.pageAction.getTitle unsupported!');
      }
    }
  });
}

function storageLocalGet(query) {
  return new Promise(function (resolv, reject) {
    try {
      let executing = getBrowser().storage.local.get(query);
      if (!executing) {
        getBrowser().storage.local.get(query, resolv);
        return;
      }
      executing.then(resolv).catch(reject);
    } catch (err) {
      try {
        getBrowser().storage.local.get(query, resolv);
      } catch (err) {
        reject('browser.storage.local.get unsupported!');
      }
    }
  });
}

function storageLocalSet(query) {
  return new Promise(function (resolv, reject) {
    try {
      let executing = getBrowser().storage.local.set(query);
      if (!executing) {
        getBrowser().storage.local.set(query, resolv);
        return;
      }
      executing.then(resolv).catch(reject);
    } catch (err) {
      try {
        getBrowser().storage.local.set(query, resolv);
      } catch (err) {
        reject('browser.storage.local.set unsupported!');
      }
    }
  });
}



function pageActionHandler(event) {
  chrome.tabs.create({
    "url": "/view/config.html"
  });
}

if (chrome.pageAction && chrome.pageAction.onClicked) {
  chrome.pageAction.onClicked.addListener(pageActionHandler);
} else {
  console.warn('chrome.pageAction.onClicked unsupported!');
}
if (chrome.browserAction && chrome.browserAction.onClicked) {
  chrome.browserAction.onClicked.addListener(pageActionHandler);
} else {
  console.warn('chrome.browserAction.onClicked unsupported!');
}



let config = getFromStorage();

function returnResponse(message, sender, sendResponse) {
  // console.log(JSON.stringify(message, null, 1));
  if (!message.popup) {
    return;
  }
  syncStorage(message);
  let responseMessage = 'Connecting...';
  sendResponse({
    message: responseMessage,
    config: config
  });
}

chrome.runtime.onMessage.addListener(returnResponse);

async function syncStorage(message) {
  if (message.config) {
    await setIntoStorage(message.config);
  }
  config = await getFromStorage();
}

async function getFromStorage() {
  try {
    await storageLocalGet('mstdn');
  } catch (err) {
    await storageLocalSet({
      'mstdn': {}
    });
  }
  let _results = await storageLocalGet('mstdn');
  if (_results.mstdn) {
    _results = _results.mstdn;
  }
  return _results;
}

async function setIntoStorage(data) {
  await storageLocalSet({
    'mstdn': data
  });
}



function initializePageAction(tab) {
  if (chrome.pageAction && chrome.pageAction.setIcon && chrome.pageAction.setTitle) {
    chrome.pageAction.setIcon({
      tabId: tab.id,
      path: "icons/mastoandon-32.png"
    });
    chrome.pageAction.setTitle({
      tabId: tab.id,
      title: getBrowser().i18n.getMessage('extensionName')
    });
  } else {
    console.warn('chrome.pageAction.setIcon unsupported!')
  }
  if (chrome.pageAction) {
    chrome.pageAction.show(tab.id);
  }
}

function initializePageActions() {
  tabsQuery({}).then((tabs) => {
    console.log('# of tabs ' + tabs.length);
    for (let tab of tabs) {
      initializePageAction(tab);
    }
  }).catch(console.warn);
}

initializePageActions();
chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  console.log('onUpdated ' + id);
  initializePageAction(tab);
});

function initialize() {}

initialize();