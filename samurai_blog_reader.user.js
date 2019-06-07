// ==UserScript==
// @name         侍エンジニア塾ブログReader
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  侍エンジニア塾ブログの記事を見やすく表示
// @author       ripple
// @match        https://www.sejuku.net/blog/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    var $ = window.jQuery;

    // メイン記事の親をすべてremoveする
    var $main = $("main#main");
    while($main.parent()[0].tagName !== "BODY") {
        $main.unwrap();
    }
    $main.siblings().remove();

    $('.meta-image').remove();
    $("[class^='eye-catch']").remove();

    // ↓うまくいかない
    $('#sticky_header').empty();
    $(".entry-title").appendTo("#sticky_header");

})();
