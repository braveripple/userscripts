// ==UserScript==
// @name         Active mailをやや使いやすくする
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://mail.ucom.co.jp/am_bin/ammain/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
  'use strict';

  const doc = window.parent.document;
  if (doc.querySelector(".selected_tab").id === "rmail") {
    // メール受信に居る場合、セレクトボックスの件数に1000を追加して初期選択する
    const iframe = doc.querySelector("#contentIframe");
    const iDocument = iframe.contentDocument;
    const opt = iDocument.createElement("option");
    opt.value = "1000";
    opt.innerText = "1000件";
    const select = iDocument.querySelector("#list_page_size_select");
    select.append(opt);
    select.value = "1000";
  }

})();
