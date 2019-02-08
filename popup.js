// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];

    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

}

/**
 * Strip the subscriber-only class
 * Strip the hide class
 * Remove elements with subscription-required class
 *  Remove elements with redacted-overlay class
 */
function stripSubsriberOnly() {
	var script = 'var subscriberPrem = document.getElementsByClassName("subscriber-premium"); '  +
							 'while (subscriberPrem[0]) {subscriberPrem[0].classList.remove("subscriber-premium");}' +
	
							 'var subscriberOnly = document.getElementsByClassName("subscriber-only"); '  +
							 'while (subscriberOnly[0]) {subscriberOnly[0].classList.remove("subscriber-only");}' +

							 'var hidden = document.getElementsByClassName("hide"); '  +
							 'while (hidden[0]) {hidden[0].classList.remove("hide");}' +

							 'var subscriptionRequired = document.getElementsByClassName("subscription-required"); '  +
							 'while (subscriptionRequired[0]) {subscriptionRequired[0].parentNode.removeChild(subscriptionRequired[0]);}' +

							 'var redactedOverlay = document.getElementsByClassName("redacted-overlay"); '  +
							 'while (redactedOverlay[0]) {redactedOverlay[0].parentNode.removeChild(redactedOverlay[0]);}'

  chrome.tabs.executeScript({
    code: script
  });
}


document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url) => {
		var btn = document.getElementById('hack_button');
		
    // Hack the news when the button is clicked
		btn.addEventListener('click', () => {
			stripSubsriberOnly();
    });
  });
});
