console.log('load content-script.');
var browser = chrome;

function onReceived(message) {
  if (!message) {
    return;
  }
  // console.log(JSON.stringify(message, null, 2));
}



function onFailed(err) {
  if (err) {
    console.error(err);
  }
}

function loadFromBackground(e) {
  if (!e.type)
    return;
  authorize();
  checkConfirmedHost();
}

function sendMessage(requestMessage) {
  if (browser != chrome) {
    var sending = browser.runtime.sendMessage(requestMessage);
    sending.then(onReceived, onFailed);
  } else {
    browser.runtime.sendMessage(requestMessage, function (responseMessage) {
      if (responseMessage) {
        onReceived(responseMessage);
      } else {
        if (browser.runtime) {
          onFailed(browser.runtime.lastError);
        }
      }
    });
  }
}

function authorize() {
  var location = window.location;
  var hostname = new URL(location).hostname;

  var code = getCode();
  if (!code) {
    return;
  }
  if (location != 'https://' + hostname + '/oauth/authorize/' + code) {
    return;
  }
  // console.log("content script sending message " + e.type);
  sendMessage({
    content: true,
    hostname: hostname,
    code: code
  });
}

function checkConfirmedHost() {
  var location = window.location;
  var hostname = new URL(location).hostname;
  if (location == 'https://' + hostname + '/web/getting_started') {
    sendMessage({
      confirm: true,
      hostname: hostname,
      page: '/web/getting_started'
    });
  }
  if (location == 'https://' + hostname + '/web/follow_requests') {
    sendMessage({
      confirm: true,
      hostname: hostname,
      page: '/web/follow_requests'
    });
  }
  if (location == 'https://' + hostname + '/web/notifications') {
    sendMessage({
      confirm: true,
      hostname: hostname,
      page: '/web/notifications'
    });
  }
  if (location == 'https://' + hostname + '/web/timelines/home') {
    sendMessage({
      confirm: true,
      hostname: hostname,
      page: '/web/timelines/home'
    });
  }
  if (location == 'https://' + hostname + '/web/timelines/public') {
    sendMessage({
      confirm: true,
      hostname: hostname,
      page: '/web/timelines/public'
    });
  }
  if (location == 'https://' + hostname + '/web/timelines/public/local') {
    sendMessage({
      confirm: true,
      hostname: hostname,
      page: '/web/timelines/public/local'
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