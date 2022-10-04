(function () {
    const Chatbox = () => {
        let _chat = [],
            _name = "s1.ahri:";

        const _ = $("#chat_box_input"),
            _area = $(".chat_box_area"),
            _btn = $(".chat_box_send");
        _.on("keyup", function (e) {
            if (e.key === "Enter") {
                chatUpdate();
            }
        });
        _btn.on("click", function () {
            chatUpdate();
        });

        const chatUpdate = () => {
            let _txt = _.val(),
                _html = "";

            if (_txt === "" || !_txt) return false;

            let _arr = _name + _txt;
            if (_chat.length >= 5) {
                _chat.shift();
            }
            _chat.push(_arr);

            for (let _c of _chat) {
                _html += `<li>${_c}</li>`;
            }
            _area.html(_html);
            chatReset();
        };

        const chatReset = () => {
            _.val("");
        };
    };
    Chatbox();
})();
