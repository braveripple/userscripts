// ==UserScript==
// @name         トースト通知のサンプル(toastr)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       ripple
// @match        https://www.google.com/*
// @resource     toastrCSS https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    var css = GM_getResourceText("toastrCSS");
    GM_addStyle(css);

    var toastr = window.toastr;
    
    toastr.info("This is toastr info toast. <br> no options", "info");
    
    toastr.options = {
	  "closeButton": true,
	  "debug": false,
	  "newestOnTop": false,
	  "progressBar": true,
	  "positionClass": "toast-bottom-right",
	  "preventDuplicates": false,
	  "onclick": null,
	  "showDuration": "300",
	  "hideDuration": "1000",
	  "timeOut": "3000",
	  "extendedTimeOut": "1000",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
	}
    toastr.info("This is toastr info toast.", "info");
    toastr.success("This is toastr success toast.", "success");
    toastr.warning("This is toastr warning toast.", "warning");
    toastr.error("This is toastr error toast.", "error");
})();
