// ==UserScript==
// @name         テーブルタグからExcelファイルをダウンロード
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  テーブルタグにExcelファイルをエクスポートするボタンを追加する
// @author       ripple
// @match        http://www.htmq.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.14.3/xlsx.full.min.js
// ==/UserScript==

// つくりかけ。
(function() {
    'use strict';
    document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" />');
    document.head.insertAdjacentHTML('beforeend',
`<style>
    .fa-file-excel {
      color: seagreen;
      font-size: 1.3em;
      cursor: pointer;
    }

    .fa-file-excel:hover {
      color: mediumseagreen;
      font-size: 1.5em;
    }
</style>`);

    function clickExcelButton(event) {
        const table = event.target.previousElementSibling;
        const workbook = XLSX.utils.table_to_book(table);
        XLSX.writeFile(workbook, 'out.xlsx');
//         var wopts = {
//             bookType: 'xlsx',
//             bookSST: false,
//             type: 'binary'
//         };
//         var wbout = XLSX.write(workbook, wopts);
//         console.log(wbout);
    }
    // テーブルタグの後ろにExcelボタンを追加
    Array.from(document.querySelectorAll('table')).forEach((e)=>{
        e.insertAdjacentHTML('afterend', `<i class="fas fa-file-excel"></i>`)
    });
    // Excelボタンにクリックイベントを追加
    Array.from(document.querySelectorAll('i.fa-file-excel')).forEach((e, index)=>{
        e.addEventListener("click", clickExcelButton);
    });
})();

