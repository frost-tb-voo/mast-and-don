console.log('load content-script.');
//var browser = chrome;

function onReceived(message) {
  if (!message) {
    return;
  }
  // console.log(JSON.stringify(message, null, 2));
}

function onFailed(err) {
  console.error(err);
}

function loadFromBackground(e) {
  if (!e.type)
    return;

  // console.log("content script sending message " + e.type);
  var location = window.location;
  var hostname = new URL(location).hostname;
  // console.log('hostname : ' + hostname);

  var code = getCode();
  if (!code) {
    return;
  }
  if (location != 'https://' + hostname + '/oauth/authorize/' + code) {
    return;
  }
  // console.log('returned code : ' + code);
  if (browser != chrome) {
    var sending = browser.runtime.sendMessage({
      content: true,
      hostname: hostname,
      code: code
    });
    sending.then(onReceived, onFailed);
  } else {
    browser.runtime.sendMessage({
      content: true,
      hostname: hostname,
      code: code
    }, function (message) {
      if (message) {
        onReceived(message);
      } else {
        if (browser.runtime) {
          onFailed(browser.runtime.lastError);
        }
      }
    });
  }
}

function getCode() {
  for (var code of document.getElementsByTagName("code")) {
    var code = code.innerText;
    
    // console.log('returned code : ' + code);
    return code;
  }
}

window.addEventListener("load", loadFromBackground);
window.addEventListener("onload", loadFromBackground);
window.addEventListener("click", loadFromBackground);



function receiveUpdate(message, sender, sendResponse) {
  // nothing todo. this is to avoid connection error.
}

browser.runtime.onMessage.addListener(receiveUpdate);
