// ==UserScript==
// @name         あしあと。
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  uploader.jpのアップローダーを訪問した足跡を残す。
// @author       braveripple
// @match        https://*.getuploader.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jspanel3/3.11.2/jquery.jspanel.min.js
// @ran-at       document-end
// ==/UserScript==

(function() {
  'use strict';
  //document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">`);
  document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jspanel3/3.11.2/jquery.jspanel.min.css" />`);

  // 格納データ
  // recentUploaderURL : 直前に訪問したアップローダーURL
  // footprints : 過去に訪問したアップローダー情報

  const recentUploaderURL = GM_getValue("recentUploaderURL","");

  // アップローダーURLを取得
  const uploaderPath = location.pathname.match(/\/(\w+)\/?/)[1];
  const uploaderURL = `${location.origin}/${uploaderPath}`;

  // アップローダーURLが直近のものだったら終了
  //if (uploaderURL === recentUploaderURL) { return; }

  // 過去の足跡に今回訪問したアップローダーURLがあれば削除
  const footprints = JSON.parse(GM_getValue("footprints","[]"));
  const index = footprints.findIndex(e => e.url === uploaderURL);
  if (index !== -1) {
    // 破壊的メソッドで取り出した後の配列を作るのが目的なので戻り値は不要。
    footprints.splice(index, 1);
  }

  // 足跡をつける
  const uploaderName = document.querySelector(".page-header > h1").firstChild.nodeValue.trim();
  const footprint = {
    url : uploaderURL,
    name : uploaderName,
    timestamp : Date.now()
  }
  footprints.push(footprint);

  GM_setValue("recentUploaderURL", uploaderURL);
  GM_setValue("footprints", JSON.stringify(footprints));
  console.log(footprints);
  console.log(uploaderURL);

  // ----------------------------------------------
  var tmp = footprints.reverse().map((value, index) => `<button type="button" class="list-group-item list-group-item-action" data-url="${value.url}">${value.name}</button>`).join('');
  var content = `
<div class="list-group">
  ${tmp}
</div>`;
  function clickButton(event) {
    window.location.href = event.target.dataset.url;
  }

  const $ = window.jQuery;
  $.jsPanel({
    contentSize: { width: 300, height: 450 },
    content: '<iframe width="100%" height="100%"></iframe>',
    position: {
      my: "left-center",
      at: "left-center"
    },
    theme: 'rebeccapurple',
    headerTitle: 'あしあと。',
    callback: function (panel) {

      const iframe = panel.content[0].firstElementChild;
      const iDocument = iframe.contentDocument;
      iDocument.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">`);
      iDocument.open();
      iDocument.write(content);
      iDocument.close();
      Array.from(iDocument.querySelectorAll("button")).forEach(function (element) {
        element.addEventListener('click', clickButton);
      });
      // ↓この処理がないと画面表示直後、パネルを垂直方向にしか動かせない（バグ？）
      panel.maximize();
      panel.normalize();
    }
  });


})();
