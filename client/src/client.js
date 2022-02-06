"use strict";
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
    if (!text)
        return;
    input.value = "";
    socket.emit("message", text);
};
const getBoard = (canvas) => {
    const ctx = canvas.getContext("2d");
    const fillRect = (x, y, color = "black") => {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 20, 20);
    };
    return { fillRect };
};
const getClickCoordinates = (element, event) => {
    const { top, left } = element.getBoundingClientRect();
    const { clientX, clientY } = event;
    return {
        x: clientX - left,
        y: clientY - top,
    };
};
(() => {
    // @ts-ignore
    const sock = io();
    const canvas = document.querySelector("#canvas");
    const chatForm = document.querySelector("#chat-form");
    const { fillRect } = getBoard(canvas);
    const onCanvasClick = (event) => {
        const { x, y } = getClickCoordinates(canvas, event);
        sock.emit("turn", { x, y });
    };
    sock.on("message", (text) => {
        log(text);
    });
    sock.on("turn", ({ x, y }) => {
        fillRect(x, y);
    });
    sock.on("joined", (turns = []) => {
        for (let { x, y } of turns) {
            fillRect(x, y);
        }
    });
    chatForm.addEventListener("submit", (event) => {
        onChatSubmitted(sock)(event);
    });
    canvas.addEventListener("click", (event) => {
        onCanvasClick(event);
    });
})();
