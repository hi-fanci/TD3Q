(function () {
    const VIPUI = $(".user .vip");
    const VIPPopUp = $(".popup_vip .popup_heading");
    const VIPPopUpInfo = $(".popup_vip .vip_info");
    const VIPPopUpGift = $(".popup_vip .vip_gift");
    const VIPPopUpDailyInfo = $(".popup_vip .vip_daily_info");
    const VIPTabButton = $(".vip_right_tab .button");
    const VIPUpSubmit = $(".popup_vip .vip_up_submit");

    const VIPState = {
        vip: 0,
        max: 15,
        cost: 10,
        gold_card: 1000,
    };

    const VipCost = [
        10, 20, 50, 100, 150, 200, 300, 500, 1000, 2000, 3000, 4000, 6000, 8500,
        12000, 16000,
    ];
    const VipGift = [
        // vip 0
        ["thẻ 1k bạc ", "thẻ 1k gỗ", "thẻ 1k đá"],
        // vip 1
        ["thẻ 1k bạc x10 ", "thẻ 1k gỗ x10", "thẻ 1k đá x10"],
        // vip 2
        ["thẻ 1k bạc x20 ", "thẻ 1k gỗ x20", "thẻ 1k đá x20"],
        // vip 3
        ["thẻ 1k bạc x40 ", "thẻ 1k gỗ x40", "thẻ 1k đá x40"],
        // vip 4
        ["thẻ 1k bạc x60 ", "thẻ 1k gỗ x60", "thẻ 1k đá x60"],
        // vip 5
        ["thẻ 1k bạc x100 ", "thẻ 1k gỗ x100", "thẻ 1k đá x100"],
        // vip 6
        ["thẻ 1k bạc x140 ", "thẻ 1k gỗ x140", "thẻ 1k đá x140"],
        // vip 7
        ["thẻ 1k bạc x200 ", "thẻ 1k gỗ x200", "thẻ 1k đá x200"],
        // vip 8
        ["thẻ 1k bạc x300 ", "thẻ 1k gỗ x300", "thẻ 1k đá x300"],
    ];

    const VipRight = [
        // vip 0
        [
            "tướng tối đa: 10",
            "giới hạn cướp: 10",
            "giới hạn kho gỗ: 200000",
            "giới hạn kho đá: 200000",
        ],
        // vip 1
        [
            "tướng tối đa: 14",
            "giới hạn cướp: 15",
            "giới hạn kho gỗ: 300000",
            "giới hạn kho đá: 300000",
            "thu tài nguyên +5%",
        ],
        // vip 2
        [
            "tướng tối đa: 18",
            "giới hạn cướp: 20",
            "giới hạn kho gỗ: 400000",
            "giới hạn kho đá: 400000",
            "thu tài nguyên +7%",
        ],
        // vip 3
        [
            "tướng tối đa: 22",
            "giới hạn cướp: 25",
            "giới hạn kho gỗ: 500000",
            "giới hạn kho đá: 500000",
            "thu tài nguyên +10%",
            "cướp tài nguyên +5%",
        ],
        // vip 4
        [
            "tướng tối đa: 26",
            "giới hạn cướp: 30",
            "giới hạn kho gỗ: 600000",
            "giới hạn kho đá: 600000",
            "thu tài nguyên +14%",
            "cướp tài nguyên +10%",
        ],
        // vip 5
        [
            "tướng tối đa: 30",
            "giới hạn cướp: 35",
            "giới hạn kho gỗ: 700000",
            "giới hạn kho đá: 700000",
            "thu tài nguyên +19%",
            "tỉ lệ cường hóa + 1%",
            "cướp tài nguyên +15%",
        ],
        // vip 6
        [
            "tướng tối đa: 34",
            "giới hạn cướp: 40",
            "giới hạn kho gỗ: 800000",
            "giới hạn kho đá: 800000",
            "thu tài nguyên +25%",
            "tỉ lệ cường hóa + 1.5%",
            "cướp tài nguyên +20%",
        ],
        // vip 7
        [
            "tướng tối đa: 38",
            "giới hạn cướp: 45",
            "giới hạn kho gỗ: 900000",
            "giới hạn kho đá: 900000",
            "thu tài nguyên +32%",
            "tỉ lệ cường hóa + 2%",
            "cướp tài nguyên +25%",
        ],
        // vip 8
        [
            "tướng tối đa: 45",
            "giới hạn cướp: 55",
            "giới hạn kho gỗ: 1200000",
            "giới hạn kho đá: 1200000",
            "thu tài nguyên +40%",
            "tỉ lệ cường hóa + 3%",
            "cướp tài nguyên +35%",
        ],
    ];

    const UpdateUI = () => {
        let _vip = VIPState.vip;
        VIPUI.text(`VIP${_vip}`);
        VIPPopUp.text(`VIP${_vip}`);

        VIPPopUpGift.text(VipGift[+_vip]);
        let _next = VIPState.gold_card - VipCost[_vip];
        console.log(_next);
        let _txt = `nạp thêm ${VIPState.cost} sẽ đạt VIP ${_vip + 1}`;
        if (_next < 0) {
            _txt = `nạp thêm ${Math.abs(_next)} sẽ đạt VIP ${_vip + 1}`;
        }
        VIPPopUpDailyInfo.text(_txt);

        $(".gold_card").text(VIPState.gold_card);
    };

    VIPTabButton.on("click", function () {
        const _ = $(this);
        if (_.hasClass("actived")) return false;

        const VIPTab = $(".vip_right_info .block");

        let _id = _.index();

        VIPTabButton.removeClass("actived");
        VIPTab.removeClass("actived");

        _.addClass("actived");
        VIPTab.eq(_id).addClass("actived");
    });

    const Notice = (e) => {
        let _noti = $(".notice");
        if (e) {
            _noti.append(`<span class="notice_item success">thành công</span>`);
        } else {
            _noti.append(`<span class="notice_item fail">thất bại</span>`);
        }
        setTimeout(function () {
            $(".notice_item").eq(0).remove();
        }, 1600);
    };

    VIPUpSubmit.on("click", function () {
        let _x = VIPState.gold_card - VIPState.cost;
        if (_x < 0 || VIPState.vip === VIPState.max) {
            Notice(false);
            return false;
        }
        let { vip } = VIPState;
        VIPState.gold_card = _x;
        VIPState.vip = vip + 1;
        VIPState.cost = VipCost[vip + 1];
        UpdateUI();
        Notice(true);
    });

    const VIPGift = (e) => {
        let _e = VipGift[e].join(" , ");

        return `<div class="gift">
                    <p>Quà hằng ngày:</p>
                    <p>${_e}</p>
                </div>`;
    };
    const VIPRight = (e) => {
        let _e = VipRight[e],
            _ret = "";
        _e.map((a) => {
            _ret += `<li>${a}</li>`;
        });

        return _ret;
    };

    const VIPRightBlock = (e) => {
        let _gift = VIPGift(e),
            _right = VIPRight(e),
            _actived = e === VIPState.vip ? "actived" : "",
            _html = `<div class="block ${_actived}" id="vip1">
                    ${_gift}
                    <hr class="hr_custom">
                    <div class="advantage">
                        <ul class="ul_num ul_flex">
                            ${_right}
                        </ul>
                    </div>
                </div>`;
        return _html;
    };

    const VIPInit = () => {
        let { vip, next, max, cost } = VIPState;
        let _html = "";
        const VIPRightInfo = $(".vip_right_info");

        for (let _i = 0; _i < 5; _i++) {
            VIPTabButton.eq(_i).text(`VIP ${_i + vip}`);
            _html += VIPRightBlock(_i + vip);
        }
        VIPRightInfo.html(_html);
    };

    VIPInit();
})();
