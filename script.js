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

function bookmark() {
    const element = document.getElementsByClassName("add_bookmark");
    if (0 < element.length) {
        element.item(0).click();
    }
}

function save_position() {
    const element = document.getElementsByClassName("bookmark_now set_siori");
    if (0 < element.length) {
        element.item(0).firstChild.click();
    }
}

function load_setting(callback) {
    const nkc_setting_keys = {
        next_key: "ArrowRight",
        back_key: "ArrowLeft",
        is_displayed_next: true,
        is_displayed_back: true,
        scroll_main: true,
        bookmark: "Enter",
        save_position: "Enter"
    };
    chrome.storage.local.get(nkc_setting_keys, function (items) {
        for (let key in nkc_setting_keys) {
            nkc_setting[key] = (items[key] === undefined ? nkc_setting_keys[key] : items[key]);
            console.log(nkc_setting[key]);
        }
        callback();
    });
}

window.onload = function() {
    load_setting(() => {
        if (nkc_setting.scroll_main) {
            const main_position = document.getElementById("novel_honbun").getBoundingClientRect().top;
            window.scrollTo({left: 0, top: main_position - 48, behavior: "smooth"});
        }
        window.document.onkeyup = function (event) {
            if (event.key == nkc_setting.next_key) {
                go_next();
            } else if (event.key == nkc_setting.back_key) {
                go_back();
            } else if (event.key == nkc_setting.bookmark) {
                bookmark();
                if (nkc_setting.bookmark == nkc_setting.save_position) {
                    save_position();
                }
            } else if (event.key == nkc_setting.save_position) {
                save_position();
            }
        }
    });
}