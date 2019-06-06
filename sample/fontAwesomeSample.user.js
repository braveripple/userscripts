// ==UserScript==
// @name         Font Awesomeのサンプル
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       ripple
// @match        http://127.0.0.1:5500/blankpage.html
// ==/UserScript==

(function() {
    'use strict';
    
    // ↓GM_getResourceText, GM_addStyleがうまくいかなかったので代替手段↓
    // FontAwesomeのCSSを動的に追加。
    document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" />');
    // styleを動的に追加。テンプレートリテラルを使う場合contentの\をエスケープする必要があるので注意。
    document.head.insertAdjacentHTML('beforeend',
`<style>
.bomb:before {
  font-family: "Font Awesome 5 Free";
  content: '\\f1e2';
  font-weight: 900;
}
</style>`);

    document.body.insertAdjacentHTML('beforeend', '<p><span class="bomb">爆弾</span></p>');
    document.body.insertAdjacentHTML('beforeend', '<i class="fas fa-tag"></i><br>');
    document.body.insertAdjacentHTML('beforeend', '<button><i class="fas fa-file-excel"></i>Excel</button>');
})();
