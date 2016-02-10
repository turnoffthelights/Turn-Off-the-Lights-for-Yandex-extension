//================================================
/*

Turn Off the Lights
The entire page will be fading to dark, so you can watch the videos as if you were in the cinema.
Copyright (C) 2016 Stefan vd
www.stefanvd.net
www.turnoffthelights.com

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.


To view a copy of this license, visit http://creativecommons.org/licenses/GPL/2.0/

*/
//================================================

// control
chrome.extension.onMessage.addListener(function request(request,sender,sendResponse){
// eye protection & autoplay & shortcut
if (request.name == "automatic") {chrome.tabs.executeScript(sender.tab.id, {file: "js/light.js"});}
// contextmenu
else if (request.name == "contextmenuon") {checkcontextmenus();}
else if (request.name == "contextmenuoff") {removecontexmenus();}
else if (request.name == 'currenttabforblur') {
        chrome.tabs.captureVisibleTab(null, {format: "jpeg", quality: 50}, function(dataUrl) {
            sendResponse({ screenshotUrl: dataUrl });
        });
}
else if (request.name == "emergencyalf") {
chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.executeScript(tabs[i].id, {file: "js/light.js"});
            }
        }
    );
}
else if (request.name == "eyesavemeOFF") {
if(request.value == 'true'){chrome.storage.local.set({"eyea": 'true'});chrome.storage.local.set({"eyen": 'false'});}
else{chrome.storage.local.set({"eyea": 'false'});chrome.storage.local.set({"eyen": 'true'});}
chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.executeScript(tabs[i].id, {file: "js/removelight.js"});
            }
        }
    );
}
else if (request.name == "eyesavemeON") {
if(request.value == 'true'){chrome.storage.local.set({"eyea": 'true'});chrome.storage.local.set({"eyen": 'false'});}
else{chrome.storage.local.set({"eyea": 'false'});chrome.storage.local.set({"eyen": 'true'});}
chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.executeScript(tabs[i].id, {file: "js/reloadlight.js"});
            }
        }
    );
}
else if (request.name == "adddarkyoutube") {
chrome.tabs.query({}, function (tabs) {
        chrome.tabs.executeScript(sender.tab.id, {allFrames: true, file: "js/youtubedark.js"});
        }
    );
}
else if (request.name == "addnormalyoutube") {
chrome.tabs.query({}, function (tabs) {
        chrome.tabs.executeScript(sender.tab.id, {allFrames: true, file: "js/youtubewhite.js"});
        }
    );
}
else if (request.name == "nmcustomx") {
if(request.value){chrome.storage.local.set({"nmcustomx": request.value});}
}
else if (request.name == "nmcustomy") {
if(request.value){chrome.storage.local.set({"nmcustomy": request.value});}
}
else if (request.name == "mastertabdark") {
if(request.value == 'true'){
	chrome.tabs.query({}, function (tabs) {
				for (var i = 0; i < tabs.length; i++) {
					chrome.tabs.executeScript(tabs[i].id, {file: "js/removelight.js"});
				}
			}
		);
}
else{
	chrome.tabs.query({}, function (tabs) {
				for (var i = 0; i < tabs.length; i++) {
					chrome.tabs.executeScript(tabs[i].id, {file: "js/golight.js"});
				}
			}
		);
}
}
return true;
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		chrome.storage.local.get(['pageaction'], function(chromeset){		
			if ((tab.url.match(/^http/i)||tab.url.match(/^file/i)) && (chromeset["pageaction"] != "true") && (chromeset["pageaction"] != true)) {
					if(tabId != null){
					// fix Chrome bug, can't show icon on HDPI screen
					// chrome.pageAction.setIcon({tabId: tab.id, path: {'19': 'icons/icon1.png', '38':'icons/icon1@2x.png'}});
					// https://code.google.com/p/chromium/issues/detail?id=381383
					chrome.pageAction.show(tabId);
					}
			}
		});
});

chrome.pageAction.onClicked.addListener(function(tabs) {
    chrome.storage.local.get(['alllightsoff'], function(chromeset){
    if ((chromeset["alllightsoff"]!="true") && (chromeset["alllightsoff"]!=true)){
    chrome.tabs.executeScript(tabs.id, {file: "js/light.js"}, function() {if (chrome.runtime.lastError) {
    // console.error(chrome.runtime.lastError.message);
    }});
} else {
    chrome.tabs.executeScript(tabs.id, {file: "js/mastertab.js"}, function() {if (chrome.runtime.lastError) {
    // console.error(chrome.runtime.lastError.message);
    }});
}
});
});

// contextMenus
function onClickHandler(info, tab) {
var str = info.menuItemId;var resvideo = str.substring(0, 9);var respage = str.substring(0, 8);
if (resvideo == "totlvideo" || respage == "totlpage") {chrome.tabs.executeScript(tab.id, {file: "js/light.js"});}
else if (info.menuItemId == "totlguideemenu") {window.open("https://www.turnoffthelights.com/extension/yandexguide.html", "_blank");}
else if (info.menuItemId == "totldevelopmenu") {window.open("https://www.turnoffthelights.com/donate.html", "_blank");}
else if (info.menuItemId == "totlratemenu") {window.open("https://chrome.google.com/webstore/detail/turn-off-the-lights/bfbmjmiodbnnpllbbbfblcplfjjepjdn/reviews", "_blank");}
else if (info.menuItemId == "totlsharemenu") {window.open("https://www.turnoffthelights.com/shareextension.html", "_blank");}
else if (info.menuItemId == "totlshareemail") {window.open("mailto:youremail?subject=Turn Off the Lights Chrome extension&body=Hé, This is amazing. I just tried today this Turn Off the Lights Chrome extension https://chrome.google.com/webstore/detail/turn-off-the-lights/bfbmjmiodbnnpllbbbfblcplfjjepjdn", "_blank");}
else if (info.menuItemId == "totlsharetwitter") {window.open("https://twitter.com/home?status=Try%20self%20this%20amazing%20Turn%20Off%20the%20Lights%20Chrome%20extension%20chrome.google.com/webstore/detail/turn-off-the-lights/bfbmjmiodbnnpllbbbfblcplfjjepjdn", "_blank");}
else if (info.menuItemId == "totlsharefacebook") {window.open("https://www.facebook.com/sharer/sharer.php?u=chrome.google.com/webstore/detail/turn-off-the-lights/bfbmjmiodbnnpllbbbfblcplfjjepjdn", "_blank");}
else if (info.menuItemId == "totlsharegoogleplus") {window.open("https://plus.google.com/share?url=chrome.google.com/webstore/detail/turn-off-the-lights/bfbmjmiodbnnpllbbbfblcplfjjepjdn", "_blank");}
}

chrome.runtime.onInstalled.addListener(function() {
// check to remove all contextmenus
chrome.contextMenus.removeAll(function() {
//console.log("contextMenus.removeAll callback");
});
          
// pageaction
var sharemenusharetitle = chrome.i18n.getMessage("sharemenusharetitle");
var sharemenuwelcomeguidetitle = chrome.i18n.getMessage("sharemenuwelcomeguidetitle");
var sharemenutellafriend = chrome.i18n.getMessage("sharemenutellafriend");
var sharemenusendatweet = chrome.i18n.getMessage("sharemenusendatweet");
var sharemenupostonfacebook = chrome.i18n.getMessage("sharemenupostonfacebook");
var sharemenupostongoogleplus = chrome.i18n.getMessage("sharemenupostongoogleplus");
var sharemenuratetitle = chrome.i18n.getMessage("sharemenuratetitle");
var sharemenudonatetitle = chrome.i18n.getMessage("sharemenudonatetitle");

/*var contexts = ["page_action", "browser_action"];
chrome.contextMenus.create({"title": sharemenuwelcomeguidetitle, "type":"normal", "id": "totlguideemenu", "contexts":contexts});
chrome.contextMenus.create({"title": sharemenudonatetitle, "type":"normal", "id": "totldevelopmenu", "contexts":contexts});
chrome.contextMenus.create({"title": sharemenuratetitle, "type":"normal", "id": "totlratemenu", "contexts":contexts});

// Create a parent item and two children.
var parent = chrome.contextMenus.create({"title": sharemenusharetitle, "id": "totlsharemenu", "contexts":contexts});
var child1 = chrome.contextMenus.create({"title": sharemenutellafriend, "id": "totlshareemail", "parentId": parent});
var child2 = chrome.contextMenus.create({"title": sharemenusendatweet, "id": "totlsharetwitter", "parentId": parent});
var child3 = chrome.contextMenus.create({"title": sharemenupostonfacebook, "id": "totlsharefacebook", "parentId": parent});
var child4 = chrome.contextMenus.create({"title": sharemenupostongoogleplus, "id": "totlsharegoogleplus", "parentId": parent});*/
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

// context menu for page and video
var menupage = null;
var menuvideo = null;
var contextmenuadded = false;
var contextarrayvideo = [];
var contextarraypage = [];
function checkcontextmenus(){
    if(contextmenuadded == false){
    contextmenuadded = true;

    // video
    var contexts = ["video"];
    for (var i = 0; i < contexts.length; i++){
    var context = contexts[i];
    var videotitle = chrome.i18n.getMessage("videotitle");
    menuvideo = chrome.contextMenus.create({"title": videotitle, "type":"normal", "id": "totlvideo"+i, "contexts":[context]});
    contextarrayvideo.push(menuvideo);
    }

    // page
    var contexts = ["page","selection","link","editable","image","audio"];
    for (var i = 0; i < contexts.length; i++){
    var context = contexts[i];
    var pagetitle = chrome.i18n.getMessage("pagetitle");
    menupage = chrome.contextMenus.create({"title": pagetitle, "type":"normal", "id": "totlpage"+i, "contexts":[context]});
    contextarraypage.push(menupage);
    }
    
    }
}

function removecontexmenus(){
    if (contextarrayvideo.length > 0) {
        for (var i=0;i<contextarrayvideo.length;i++) {
            if (contextarrayvideo[i] === undefined || contextarrayvideo[i] === null){}else{
            chrome.contextMenus.remove(contextarrayvideo[i]);
            }
        }
    }
    if (contextarraypage.length > 0) {
        for (var i=0;i<contextarraypage.length;i++) {
            if (contextarraypage[i] === undefined || contextarraypage[i] === null){}else{
            chrome.contextMenus.remove(contextarraypage[i]);
            }
        }
    }
    contextarrayvideo = [];
    contextarraypage = [];
    contextmenuadded = false;
}

try{ chrome.runtime.setUninstallUrl("https://www.turnoffthelights.com/extension/yandexuninstalled.html"); }
catch(e){}

// Fired when an update is available
chrome.runtime.onUpdateAvailable.addListener(function() {chrome.runtime.reload();});

// convert from old storage to new
if(localStorage["firstRun"] == "false"){ chrome.storage.local.set({"firstRun": "false"}); }
if(localStorage["version"] == "2.1"){ chrome.storage.local.set({"version": "2.1"}); }
if(localStorage["version"] == "2.0.0.81"){ chrome.storage.local.set({"version": "2.0.0.81"}); }


function initwelcome(){
chrome.storage.local.get(['firstRun'], function(chromeset){
if ((chromeset["firstRun"]!="false") && (chromeset["firstRun"]!=false)){
  var totlidextension = chrome.i18n.getMessage("@@extension_id");
  chrome.tabs.create({ url: "https://www.turnoffthelights.com/extension/yandexwelcome.html", selected: true })
  //chrome.tabs.create({url: "https://www.turnoffthelights.com/extension/yandexguide.html", selected:false}) // Yandex design
  chrome.storage.local.set({"firstRun": "false"});
  chrome.storage.local.set({"version": "2.4"});
}
});
}

initwelcome();