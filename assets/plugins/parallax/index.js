(function () {
    const page = {
        html: $("html"),
        screenheight: 0,
        scrollclass: "no-scroll",

        device: "pc",
        ready: false,
    };

    const app = {
        base: $(".app"),
        target: $(".app__scroll"),

        scrollsta: "",
        currpos: 0,
        prevpos: 0,
        timestamp: 40,
        isscroll: false,

        scrollstep: 100,
    };
    const parrallax = {
        target: $(".js_parallax"),
    };

    const appInit = () => {
        let _mobiCheck =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            );
        if (_mobiCheck) {
            console.log("load mobi");
            page.html.addClass("is-mobile");

            page.device = "mobile";
        } else {
            console.log("load pc");
            page.html.addClass("is-pc");
            page.html.addClass(page.scrollclass);
        }
        page.screenheight = window.innerHeight;

        parrallax.target.map((a, b) => {
            const _ = $(b);
            _.parent().addClass("parallax__wrap--mask");
        });

        resetScreen();
        page.ready = true;
    };

    const appControls = (e) => {
        switch (e.type) {
            case "load": {
                break;
            }

            case "wheel": {
                break;
            }

            case "scroll": {
                let _y = app.currpos;
                app.target.css({
                    transform: `translateY(${_y}px)`,
                });

                parallaxControls({
                    type: "scroll",
                });
            }
            case "freescroll": {
                let _y = (app.currpos - app.newpos) * 0.25;
                let _newpos = app.currpos + _y;

                app.target.css({
                    transform: `translateY(${_newpos}px)`,
                });
                console.log("first");
                if (Math.round(_y) !== 0) {
                    setTimeout(() => {
                        appControls({ type: "freescroll" });
                    }, 10);
                }
                break;
            }
            default:
                break;
        }
    };

    app.base.on("wheel", function (e) {
        if (!app.isscroll) {
            const hihi = e.originalEvent.deltaY;
            let _htmlHeight =
                ($("html").innerHeight() - page.screenheight) * -1;
            app.currpos -= hihi;
            if (app.currpos >= 0) {
                app.currpos = 0;
            }

            if (app.currpos <= _htmlHeight) {
                app.currpos = _htmlHeight;
            }

            // if (hihi < 0) {
            //     app.scrollsta = "up";
            //     console.log("up")
            // } else {
            //     console.log("down")
            //     app.scrollsta = "down";
            // }

            appControls({ type: "scroll" });
            app.isscroll = true;

            setTimeout(function () {
                app.isscroll = false;
            }, app.timestamp);
        }

        app.prevpos = app.currpos;
    });

    const parallaxControls = (e) => {
        switch (e.type) {
            case "load": {
                parrallax.target.map((a, b) => {
                    const _ = $(b);
                    _.parent().addClass("parallax__wrap--mask");
                });
                break;
            }

            case "scroll": {
                if (app.currpos === 0) return;
                parrallax.target.map((a, b) => {
                    const _ = $(b);
                    let _top = _.parent().position().top,
                        _height = _.parent().innerHeight(),
                        _t = _.parent().offset().top;
                    let _a = -app.currpos + page.height * 0.5;

                    if (_top < -app.currpos + page.height && _t + _height > 0) {
                        let _y = (_top + _a) * -0.24;

                        _.css({
                            transform: `translate3d(0, ${_y}px, ${-_y}px)`,
                        });
                    }
                });
                break;
            }
            default:
                break;
        }
    };

    const gotoPos = (e) => {
        const gotoWithParallax = () => {
            let _py = -app.currpos;
            let _pos = _py - e;

            app.scrollsta = "freescroll";
            app.newpos = _pos;
            appControls({ type: "freescroll" });
        };
        if (page.device === "pc") {
            gotoWithParallax();
        }
    };

    const resetScreen = () => {
        setTimeout(function () {
            window.scrollTo(0, 0);
            $(window).scrollTop(0);
        }, 0);
    };

    // init => base wheel => update => setime out
    $(window).on("load", function () {
        appInit();

        parallaxControls({
            type: "load",
        });

        $(".js_goto").on("click", function () {
            let _target = $(this).attr("data-goto"),
                _top = $(_target).offset().top;

            gotoPos(_top);
        });
    });

    $(window).on("scroll", function () {
        return;
    });
})();
