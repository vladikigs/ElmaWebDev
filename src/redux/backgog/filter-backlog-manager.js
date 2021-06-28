
export function setFilterByName(name) {
    let list = $(".backlog-item-name");
    for (let i = 0; i < list.length; i++) {
        let item = $(".backlog-item-name")[i];
        if (item.textContent.includes(name)) {
            $(".backlog-item-name")[i].parentElement.hidden = false;
        } else {
            $(".backlog-item-name")[i].parentElement.hidden = true;
        }
    }
}
