// ==UserScript==
// @name            選択範囲を引用する
// @namespace       http://tampermonkey.net/
// @description     選択範囲を引用文としてクリップボードにコピー
// @version         0.2
// @author          braveripple
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

    GM_addStyle(GM_getResourceText("toastrCSS"));

    function copyToClipboard(value) {
        const copyFrom = document.createElement("textarea");
        copyFrom.textContent = value;

        document.body.appendChild(copyFrom);
        copyFrom.select();

        const retVal = document.execCommand('copy');
        document.body.removeChild(copyFrom);
        return retVal;
    }
    function makeQuote() {
        let title = window.document.title;
	// Scrapbox向けの加工。角括弧を解釈されない文字に置き換える。
	title = title.replace("[","⟦").replace("]","⟧");
        let url = window.location.href;

        // 引用ページがGoogle検索ならqパラメータ以降のパラメータをはしょる。
        if (url.match(/www.google.com\/search/)) {
            url = url.substring(0, url.indexOf("&"))
        }
        const selectedText = window.getSelection().toString();
        const quote = selectedText === "" ? "" : selectedText.replace(/^/gm,">");

        const output =
`copy from [${title} ${url}]
${quote}`;
        return output;
    }

    copyToClipboard(makeQuote());

    const toastr = window.toastr;
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
    toastr.success("コピーしました。");

})();
