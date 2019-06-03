// ==UserScript==
// @name            選択範囲を引用する
// @namespace       http://tampermonkey.net/
// @description     選択範囲を引用文としてクリップボードにコピー
// @version         0.1
// @author          You
// @include         *
// @grant           none
// @run-at          context-menu
// ==/UserScript==]

(function() {
    'use strict';

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

    const output = `
copy from [${title} ${url}]
${quote}
`;
    copyToClipboard(output);

})();
