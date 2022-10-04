const DataHover = () => {
    const _ = $(".js_hover"),
        __ = $(".data_hover");

    _.on("mouseenter", function () {
        let _pos = $(this).offset(),
            _x = _pos.left,
            _y = _pos.top,
            _w = $(this).innerWidth(),
            _txt = $(this).attr("data-hover");

        __.text(_txt);
        __.css({
            opacity: "1",
            top: `${_y}px`,
            left: `${_x + _w * 0.5}px`,
        });
    }).on("mouseleave", function () {
        __.css({
            opacity: "0",
        });
    });
};
DataHover();

const AddItem = () => {
    const Gold = (e) =>
        `<img src="https://cdn.iconscout.com/icon/premium/png-128-thumb/gold-coins-6149162-5046057.png" alt=""><span>${e}</span>`;
    const Silver = (e) =>
        `<img src="https://cdn.iconscout.com/icon/premium/png-128-thumb/silver-coins-6149163-5046058.png" alt=""><span>${e}</span>`;
    const Wood = (e) =>
        `<img src="https://cdn2.iconfinder.com/data/icons/food-icons-6/200/farm_wood-512.png" alt=""><span>${e}</span>`;
    const Rock = (e) =>
        `<img src="https://cdn2.iconfinder.com/data/icons/outlined-valuable-items/200/minerals_pure_silver-512.png" alt=""><span>${e}</span>`;
    const MainStarCard = (e) => `<i>S</i><span>${e}</span>`;

    const _ = $(".js_add_item");
    _.map((a, b) => {
        const __ = $(b);
        let _item = __.attr("data-item"),
            _amount = __.attr("data-amount"),
            _html = "";
        switch (_item) {
            case "gold": {
                _html = Gold(_amount);
                break;
            }
            case "silver": {
                _html = Silver(_amount);
                break;
            }
            case "wood": {
                _html = Wood(_amount);
                break;
            }
            case "rock": {
                _html = Rock(_amount);
                break;
            }
            case "main_star_card": {
                _html = MainStarCard(_amount);
                break;
            }
            default:
                break;
        }
        __.html(_html);
    });
};
AddItem();

const AddStar = () => {
    const _ = $(".stars");
    _.map((a, b) => {
        const __ = $(b);
        let _star = +__.attr("data-ori"),
            _ori = __.find(".ori"),
            _next = __.find(".next"),
            _span = `<span>*</span>`,
            _html = "";

        if (_star < 5) {
            for (let i = 0; i < _star; i++) {
                _html += _span;
            }
        } else {
            __.addClass("s10");
        }
        _ori.html(_html);
        _next.html(_html + _span);
    });
};
AddStar();

const AddStat = () => {
    const _ = $(".js_stat");
    _.map((a, b) => {
        const __ = $(b);
        let _ori = __.attr("data-ori"),
            _add = __.attr("data-add");

        let _html = `<span class="stat_ori">${_ori}</span><span class="stat_add">+${_add}</span>`;

        __.find("dd").html(_html);
    });
};

AddStat();

const GAME = {
    _lv: {
        _inf: 0.16,
        _default_exp: 10,
    },

    _stage: {
        _inf: 0.4,
        _default_exp: 10,

        _silver_inf: 1,
        _default_silver: 100,
    },

    _equip: {
        _inf: 1,
        _default_exp: 1,

        _upgrade_inf: 1,
        _upgrade_default: 100,
    },
};

const testf = (fn, mn = 1, mx = 2) => {
    for (let _i = mn; _i < mx; _i++) {
        fn(_i);
    }
};

// ----------------- STAGE --------------
// stage_exp => https://jsfiddle.net/ahri2506/sbzaeLh2/11/
const MapExp = (_stage_id) => {
    let _default_exp =
        GAME._stage._default_exp * (1 + GAME._stage._inf) ** (+_stage_id - 1);
    _default_exp =
        Math.floor(_default_exp) + (_stage_id - 1) ** (GAME._stage._inf * 10);

    console.log(`exp stage ${_stage_id} is: ${_default_exp}`);
};
//testf(MapExp);

const MapSilver = (_stage_id) => {
    let _default_silver =
        GAME._stage._default_silver *
        (1 + GAME._stage._silver_inf) ** (+_stage_id - 1);
    _default_silver =
        Math.floor(_default_silver) +
        (_stage_id - 1) ** (GAME._stage._inf * 10);

    console.log(`silver stage ${_stage_id} is: ${_default_silver}`);
};
//testf(MapSilver, 1, 15);

const NextExp = (_currentlv) => {
    let _exp =
        10 * (_currentlv - 1) +
        GAME._lv._default_exp * (1 + GAME._lv._inf) ** (_currentlv - 1);

    console.log(`exp from ${_currentlv} to ${_currentlv + 1} is: ${_exp | 0}`);
};
testf(NextExp, 130, 140);

//--------------- EQUIP ----------------
const EquipExp = (_currlv) => {
    let _exp = GAME._equip._default_exp * (1 + _currlv - 1) * _currlv;

    console.log(`equip exp from ${_currlv} to ${_currlv + 1} is : ${_exp}`);
};
//testf(EquipExp);

const EquipSilver = (_currlv) => {
    let _exp =
        GAME._equip._upgrade_default *
        (1 + _currlv * GAME._equip._upgrade_inf) *
        _currlv;

    console.log(`equip upgrade from ${_currlv} to ${_currlv + 1} is : ${_exp}`);
};
//testf(EquipSilver,50, 60);
