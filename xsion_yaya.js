// ==UserScript==
// @name         X'sion
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  X'sionをやや使いやすくする（あなたの会社のX'sionで動くとは限りません）
// @author       ripple
// @match        https://xsion-service.com/xxxx
// @grant        none
// ==/UserScript==

    function getTitle() {
        const titleDiv = document.querySelector("div.xs-utility-menu.xs-systemutility")
        if (!titleDiv) { return; }
        return titleDiv.firstElementChild.innerText;
    }

    function workFlowProcess() {
        console.log("WORKFLOW");
        const target = document.querySelector("#workflowFormContents > tbody");
        if (!target) { return; }
        console.log("申請書ぽいDOMがあるよ");

        // 使いづらいボタンを隠す
        $("a[name$='_clock']").hide();
        
        // 時刻の入力範囲を狭める
        $("select[name$=_hour]").selectAddArrayData(HOUR_LIST);
        $("select[name$=_min]").selectAddArrayData(MIN_LIST);

        // 退勤時刻
        $("select[name=11_hour]").val("17")
        $("select[name=11_min]").val("30")
        $("select[name=12_hour]").val("17")
        $("select[name=12_min]").val("45")
        
        // 申請理由
        $("#xs-form-item170Text").val("ここに申請理由を入れる")
    }

    function timeCardProcess() {
        console.log("TIMECARD");
        
        // 時刻の入力範囲を狭める
        $("select[name$=_hour]").selectAddArrayData(HOUR_LIST);
        $("select[name$=_min]").selectAddArrayData(MIN_LIST);

        // まだ未入力のタイムカードにデフォルト値を入れる
        $('select[name=10000_hour] option:selected').filter("[value='']").parent().val("9")
        $('select[name=10000_min] option:selected').filter("[value='']").parent().val("0")
        $('select[name=10001_hour] option:selected').filter("[value='']").parent().val("17")
        $('select[name=10001_min] option:selected').filter("[value='']").parent().val("30")

        // まだ未入力のコメントにデフォルト値を入れる
        $("textarea[name=100005]").filter(function () {
          return $(this).val() === '';
        }).val("ここにコメントを入れる");

        // 申請した日のタイムカードの編集ボタンがなぜか押せなくなる（非表示になる）ので、全部無理矢理表示させる。
        $("i[id*='edit-button']").show()

    }

    function process() {
        // タイトルで今居る画面を判別し、画面に応じた処理を行う
        const title = getTitle();
        if (!title) { return; }
        if (title == XSION_TITLE.TIMECARD) {
            timeCardProcess();
        } else if (title == XSION_TITLE.WORKFLOW) {
            workFlowProcess();
        }
    }

    // ローディング画像が消えたら処理を行う
    //const observerTarget = document.querySelector('div.xs-main');
    const loadingObj = document.querySelector('#overlay');
    if (!loadingObj) { return; }

    const observer = new MutationObserver(function(record, observer) {
        if(loadingObj.style.display=="none") {
            console.log("process");
            process();
        };
    });

    observer.observe(loadingObj, { attributes : true });

})();
