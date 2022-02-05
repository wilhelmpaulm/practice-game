const log = (text) => {
    const parent = document.querySelector("#events");
    const el = document.createElement("li");
    el.innerHTML = `<i><small>${new Date().toJSON()}</small><i> <br/> ${text}`;

    parent.appendChild(el);
    parent.scrollTop = parent.scrollHeight;
};

const onChatSubmitted = (socket) => (event) => {
    event.preventDefault();

    const input = document.querySelector("#chat");
    const text = input.value;

    if (!text) return;

    input.value = "";

    socket.emit("message", text);
};

(() => {
    log("welcome");

    const sock = io();
    sock.on("message", (text) => {
        log(text);
    });

    document.querySelector("#chat-form").addEventListener("submit", (event) => {
        onChatSubmitted(sock)(event);
    });
})();
