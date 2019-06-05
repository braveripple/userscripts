// ==UserScript==
// @name         トースト通知のサンプル(iziToast)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  iziToastによるトースト通知のサンプル
// @author       ripple
// @match        https://www.google.com/*
// @resource     iziToastCSS https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.4.0/css/iziToast.min.css
// @require      https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.4.0/js/iziToast.min.js
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    var css = GM_getResourceText("iziToastCSS");
    GM_addStyle(css);
    var iziToast = window.iziToast;
    iziToast.show({
        title: 'title',
        message: 'This is iziToast sample.'
    });
})();
