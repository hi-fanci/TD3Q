const AniJs = (function () {
    const aniState = {
        target: null,
        pagebottom: 999,
        options: {
            delay: 200,
            delayStart: 1000,
        },

        imageslide: {
            content: "img_slide__content",
        },
    };

    // > init image
    const InitImg = () => {
        const _ = $(".img_slide");
        if (_.length < 1) return false;

        for (let _i of _) {
            let _children = $(_i).children();
            console.log(_children);

            if (_children.length === 1) {
                _children.addClass(aniState.imageslide.content);
            } else {
                let _src = $(_i).attr("src");
                if (_src) {
                    let _parent = $(_i).parent();

                    _parent.html(`
                    <figure class="ani img_slide">
                        <img class="${aniState.imageslide.content}" src="${_src}" alt="image">
                    </figure>`);
                } else {
                    $(_i).removeClass("ani");
                    $(_i).removeClass("img_slide");
                }
            }
        }
    };

    // > init linebar
    const InitLinebar = function () {
        const _ = $(".linebar");
        if (_.length < 1) return false;

        for (let item of _) {
            let _item = $(item),
                _itemText = _item.text().trim();
            _.html(`<span class="linebar__inside">${_itemText}</span>`);
        }
    };

    /*
    > init all
    */
    const InitAll = () => {
        // create linebar
        InitLinebar();
        // create image slide
        InitImg();

        aniState.target = $(".ani");
    };

    // animation
    const Animate = function (e) {
        let // time delay each other
            _time = 0,
            _wh = window.innerHeight,
            // current offset
            _py = window.scrollY,
            // range show
            _ps = _py + _wh * 0.75,
            // bottom
            _pb = _py + _wh + 100;

        if (_pb >= aniState.pagebottom - 50) {
            _ps = _pb;
        }

        for (let item of aniState.target) {
            const _ = $(item);

            if (!_.hasClass("ani-pass")) {
                let _top = _.offset().top;

                if (_top >= _py && _top <= _ps) {
                    console.log("???");
                    // add class to check if it will be show
                    _.addClass("ani-pass");
                    // set time out to add class 'animated'
                    let _timeDelay = _time;
                    if (_.attr("data-ani-delay")) {
                        _timeDelay = +_.attr("data-ani-delay");
                    } else {
                        _time += e.delay;
                    }

                    let _set = setTimeout(function () {
                        _.addClass("animated");
                    }, _timeDelay);
                } else if (_.offset().top < _py) {
                    // add class if it is on top screen
                    _.addClass("ani-pass animated");
                }
            }
        }
    };

    return {
        init: function (opts) {
            let _options = { ...aniState.options, ...opts };
            InitAll(_options);

            let _settimeout = null;

            $(window).on("load", function () {
                let _fh = $("js_footer").innerHeight();
                aniState.pagebottom = _fh;

                _settimeout = setTimeout(function () {
                    Animate(_options);
                }, _options.delayStart);
            });

            $(window).on("scroll", function () {
                clearTimeout(_settimeout);
                _settimeout = setTimeout(function () {
                    //    Animate();
                }, 100);
            });
        },
    };
})();
