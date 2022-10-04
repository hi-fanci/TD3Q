(function () {
    const PopUpMainBuilding = () => {
        const _ = $(".popup_main_building");
        const buttons = _.find(".tab_buttons button");
        const items = _.find(".tab_content .tab_item");

        buttons.on("click", function () {
            if (!$(this).hasClass("actived")) {
                let _i = $(this).index();

                buttons.removeClass("actived");
                items.removeClass("actived");

                $(this).addClass("actived");
                items.eq(_i).addClass("actived");
            }
        });
    };
    PopUpMainBuilding();
})();
