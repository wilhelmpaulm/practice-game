const log = (text) => {
    const parent = document.querySelector("#events");
    const el = document.createElement("li");
    el.innerHTML = `<i><small>${(new Date()).toJSON()}</small><i> <br/> ${text}`;

    parent.appendChild(el);
    parent.scrollTop = parent.scrollHeight;
};

const onChatSubmitted = (event) => {
    event.preventDefault();

    const input = document.querySelector("#chat");
    const text = input.value;

    if (!text) return;

    input.value = "";

    log(text);
};

(() => {
    log("welcome");
 
    document
        .querySelector("#chat-form")
        .addEventListener("submit", onChatSubmitted);
})();
