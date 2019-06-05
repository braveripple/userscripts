// ==UserScript==
// @name            選択範囲を引用する
// @namespace       http://tampermonkey.net/
// @description     選択範囲を引用文としてクリップボードにコピー
// @version         0.1
// @author          You
// @include         *
// @resource        toastrCSS https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css
// @require         https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js
// @grant           GM_getResourceText
// @grant           GM_addStyle
// @run-at          context-menu
// ==/UserScript==]

(function() {
    'use strict';

    var css = GM_getResourceText("toastrCSS");
    GM_addStyle(css);
    var toastr = window.toastr;
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
        "timeOut": "1500",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
	}

    function copyToClipboard(value) {
        var copyFrom = document.createElement("textarea");
        copyFrom.textContent = value;

        var body = document.querySelector("body");
        body.appendChild(copyFrom);
        copyFrom.select();

        var retVal = document.execCommand('copy');
        body.removeChild(copyFrom);
        return retVal;
    }

    let title = window.document.title;
    let url = window.location.href;

    let selectedText = window.getSelection().toString();
    let quote = selectedText === "" ? "" : selectedText.replace(/^/gm,">");

    const output =
`copy from [${title} ${url}]
${quote}
`;
    copyToClipboard(output);

    toastr.success("コピーしました。");

})();
