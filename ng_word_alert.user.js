// ==UserScript==
// @name         NG Word Alert
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       braveripple
// @match        *://*/*
// @resource     toastrCSS https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';

  GM_addStyle(GM_getResourceText("toastrCSS"));

  const NGWords = [
    /(いかが|如何)でした(でしょう)?か/,
    /会員登録/
  ];

  const toastr = window.toastr;
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-full-width",
    "preventDuplicates": true,
    "showDuration": "0",
    "hideDuration": "0",
    "timeOut": "0",
    "extendedTimeOut": "0",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };

  const targetText = document.body.textContent;

  NGWords.forEach((ngword) => {
    const match = targetText.match(ngword);
    if (!match) { return; }
    toastr.error(`このページは『${match[0]}』が含まれています。`);
  });

})();
