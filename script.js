let nkc_setting = {};

function get_novel_link_elements() {
    return document.getElementsByClassName("novel_bn").item(0).getElementsByTagName("a");
}

function is_show_buttons() {
    const elements = document.getElementsByClassName("novel_bn");
    const rect_top = elements.item(0).getBoundingClientRect();
    const rect_under = elements.item(1).getBoundingClientRect();
    return {
        top: (0 < rect_top.top && rect_top.bottom < window.innerHeight),
        under: (0 < rect_under.top && rect_under.bottom < window.innerHeight)
    };
}

function check_next() {
    let result = true;
    const expect_string = "次へ >>";
    const next_back_buttons = get_novel_link_elements()
    if (next_back_buttons.length == 1) {
        result = false;
        const check_string = next_back_buttons.item(0).text;
        if (expect_string == check_string) {
            result = true;
        }
    }
    return result;
}

function check_back() {
    let result = true;
    const expect_string = "<< 前へ";
    const next_back_buttons = get_novel_link_elements()
    if (next_back_buttons.length == 1) {
        result = false;
        const check_string = next_back_buttons.item(0).text;
        if (expect_string == check_string) {
            result = true;
        }
    }
    return result;
}

function go_next() {
    if (this.check_next()) {
        if ((! nkc_setting.is_displayed_next) || is_show_buttons().under) {
            const next_back_buttons = get_novel_link_elements()
            const next_button = next_back_buttons.item((next_back_buttons.length == 1) ? 0 : 1);
            next_button.click()
        }
    }
}

function go_back() {
    if (this.check_back()) {
        if ((! nkc_setting.is_displayed_back) || is_show_buttons().top) {
            const next_back_buttons = get_novel_link_elements()
            const back_button = next_back_buttons.item(0);
            back_button.click()
        }
    }
}

function load_setting() {
    const nkc_setting_keys = [
        "next_key",
        "back_key",
        "is_displayed_next",
        "is_displayed_back",
        "scroll_main"
    ];
    chrome.storage.local.get(nkc_setting_keys, function (items) {
        nkc_setting_keys.forEach(element => {
            nkc_setting[element] = items[element];
        });
    });
}

window.onload = function() {
    load_setting();
    const main_position = document.getElementById("novel_honbun").getBoundingClientRect().top;
    console.log(main_position);
    window.scrollTo({left: 0, top: main_position - 48, behavior: "smooth"});
    window.document.onkeyup = function (event) {
        if (event.key == nkc_setting.next_key) {
            go_next();
        } else if (event.key == nkc_setting.back_key) {
            go_back();
        }
    }
}