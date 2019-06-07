// ==UserScript==
// @name         あしあと。
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  uploader.jpのアップローダーを訪問した足跡を残す。
// @author       braveripple
// @match        https://*.getuploader.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    // 格納データ
    // recentUploaderURL : 直前に訪問したアップローダーURL
    // footprints : 過去に訪問したアップローダー情報

    const recentUploaderURL = GM_getValue("recentUploaderURL","");

    // アップローダーURLを取得
    const uploaderName = location.pathname.match(/\/(\w+)\//)[1];
    const uploaderURL = `${location.origin}/${uploaderName}`;

    // アップローダーURLが直近のものだったら終了
    if (uploaderURL === recentUploaderURL) { return; }

    // 過去の足跡に今回訪問したアップローダーURLがあれば削除
    const footprints = JSON.parse(GM_getValue("footprints","[]"));
    const index = footprints.findIndex(e => e.url === uploaderURL);
    if (index !== -1) {
        // 破壊的メソッドで取り出した後の配列を作るのが目的なので戻り値は不要。
        footprints.splice(index, 1);
    }

    // 足跡をつける
    const footprint = {
        url : uploaderURL,
        timestamp : Date.now()
    }
    footprints.push(footprint);

    GM_setValue("recentUploaderURL", uploaderURL);
    GM_setValue("footprints", JSON.stringify(footprints));
    console.log(footprints);
    console.log(uploaderURL);

})();
