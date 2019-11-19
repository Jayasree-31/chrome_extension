// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
var activeTabId;
chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
      if (changeInfo.status == "complete") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
          chrome.tabs.sendMessage( tabs[0].id, {message: 'hello!', url: tab.url},  function(response){
            if (response != undefined){
              if(response.success){
                chrome.tabs.executeScript(tabs[0].id, {code: 'var products = ' + JSON.stringify(response.products)}, function() {
                  chrome.tabs.executeScript(tabs[0].id, {file: 'insert.js'});
                });
              };
            }
          });
        })
      }
    }
  );

});
