const log = (text: string) => {
    const parent: HTMLElement = document.querySelector("#events");
    const el = document.createElement("li");
    el.innerHTML = `<i><small>${new Date().toJSON()}</small><i> <br/> ${text}`;

    parent.appendChild(el);
    parent.scrollTop = parent.scrollHeight;
};

const onChatSubmitted = (socket) => (event: Event) => {
    event.preventDefault();

    const input: HTMLInputElement = document.querySelector("#chat");
    const text = input.value;

    if (!text) return;

    input.value = "";

    socket.emit("message", text);
};

const getBoard = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");

    const fillRect = (x: number, y: number, color: string = "black") => {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 20, 20);
    };

    return { fillRect };
};

const getClickCoordinates = (element: HTMLElement, event: MouseEvent) => {
    const { top, left } = element.getBoundingClientRect();
    const { clientX, clientY } = event;
    return {
        x: clientX - left,
        y: clientY - top,
    };
};

(() => {
    // @ts-ignore
    const sock: Socket = io();
    const canvas: HTMLCanvasElement = document.querySelector("#canvas");
    const chatForm = document.querySelector("#chat-form");

    const { fillRect } = getBoard(canvas);

    const onCanvasClick = (event: MouseEvent) => {
        const { x, y } = getClickCoordinates(canvas, event);
        sock.emit("turn", { x, y });
    };

    sock.on("message", (text: string) => {
        log(text);
    });

    sock.on("turn", ({ x, y, color }) => {
        fillRect(x, y, color);
    });

    sock.on("joined", (turns = []) => {
        for (let { x, y, color } of turns) {
            fillRect(x, y, color);
        }
    });

    chatForm.addEventListener("submit", (event) => {
        onChatSubmitted(sock)(event);
    });

    canvas.addEventListener("click", (event: MouseEvent) => {
        onCanvasClick(event);
    });
})();
