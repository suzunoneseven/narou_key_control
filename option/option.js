function input_key() {
    const self = this;
    let show_element = document.createElement("p");
    show_element.innerText = "設定するキーを入力（現在：" + self.value + "）";
    let sub_window = window.open('', 'new_window','width=400,height=300,left=100,top=150');
    sub_window.document.body.appendChild(show_element);
    sub_window.document.onkeyup = function (event) {
        self.value = event.key;
        sub_window.close();
    }
}

function save() {
    let nkc_setting = {};
    nkc_setting.next_key = document.getElementById("next_key").value;
    nkc_setting.back_key = document.getElementById("back_key").value;
    nkc_setting.is_displayed_next = document.getElementById("is_displayed_next").checked;
    nkc_setting.is_displayed_back = document.getElementById("is_displayed_back").checked;
    nkc_setting.scroll_main = document.getElementById("scroll_main").checked;
    nkc_setting.bookmark = document.getElementById("bookmark").value;
    nkc_setting.save_position = document.getElementById("save_position").value;
    if (chrome.storage !== undefined) {
        chrome.storage.local.set(nkc_setting, function () {});
    }
}

function load() {
    const nkc_setting_keys = [
        "next_key",
        "back_key",
        "is_displayed_next",
        "is_displayed_back",
        "scroll_main",
        "bookmark",
        "save_position"
    ];
    chrome.storage.local.get(nkc_setting_keys, function (items) {
        document.getElementById("next_key").value = (items.next_key === undefined ? "ArrowRight" : items.next_key);
        document.getElementById("back_key").value = (items.back_key === undefined ? "ArrowLeft" : items.back_key);
        document.getElementById("is_displayed_next").checked = (items.is_displayed_next === undefined ? true : items.is_displayed_next);
        document.getElementById("is_displayed_back").checked = (items.is_displayed_back === undefined ? true : items.is_displayed_back);
        document.getElementById("scroll_main").checked = (items.scroll_main === undefined ? true : items.scroll_main);
        document.getElementById("bookmark").value = (item.bookmark === undefined ? "Enter" : item.bookmark);
        document.getElementById("save_position").value = (item.save_position === undefined ? "Enter" : item.save_position);
    });
}

window.onload = function () {
    if (chrome.storage !== undefined) {
        load();
    }
    document.getElementById("next_key").onclick = input_key;
    document.getElementById("back_key").onclick = input_key;
    document.getElementById("bookmark").onclick = input_key;
    document.getElementById("save_position").onclick = input_key;
    document.getElementById("save_button").onclick = save;
}