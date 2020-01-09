// ==UserScript==
// @name         X'sion
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  X'sionをやや使いやすくする（あなたの会社のX'sionで動くとは限りません）
// @author       ripple
// @match        https://xsion-service.com/xxxx
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    const XSION_TITLE = { TIMECARD:"タイムカード", WORKFLOW:"ワークフロー" };

    const HOUR_LIST = [...Array(24).keys()].filter((e)=>e >= 9);
    const MIN_LIST = [0,15,30,45];

    // jQuery Plugin
    (function ($) {
        $.fn.selectAddArrayData = function (array) {
            const that = this;
            if (!that.is("select")) {
                return that;
            }

            const $selectedOption = $("option:selected", that).clone();
            that.empty();
            that.each(function (index) {
                const that2 = $(this);
                that2.append($selectedOption.get(index));
                array.forEach((elem, index) => {
                    that2.append(
                        $("<option>").val(String(elem)).text(String(elem))
                    );
                });
            });
            return that;
        };
    })(jQuery);

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

        $("a[name$='_clock']").hide();
        $("select[name$=_hour]").selectAddArrayData(HOUR_LIST);
        $("select[name$=_min]").selectAddArrayData(MIN_LIST);

        $("select[name=11_hour]").val("17")
        $("select[name=11_min]").val("30")
        $("select[name=12_hour]").val("17")
        $("select[name=12_min]").val("45")

    }
    function timeCardProcess() {
        console.log("TIMECARD");
        $("select[name$=_hour]").selectAddArrayData(HOUR_LIST);
        $("select[name$=_min]").selectAddArrayData(MIN_LIST);

        // まだ未入力のタイムカードにデフォルト値を入れる
        $('select[name=10000_hour] option:selected').filter("[value='']").parent().val("9")
        $('select[name=10000_min] option:selected').filter("[value='']").parent().val("0")
        $('select[name=10001_hour] option:selected').filter("[value='']").parent().val("17")
        $('select[name=10001_min] option:selected').filter("[value='']").parent().val("30")

    }
    function process() {
        const title = getTitle();
        if (!title) { return; }
        if (title == XSION_TITLE.TIMECARD) {
            timeCardProcess();
        } else if (title == XSION_TITLE.WORKFLOW) {
            workFlowProcess();
        }
    }

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
