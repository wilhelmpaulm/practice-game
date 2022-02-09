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
const getBoard = (canvas, numCells = 5) => {
    const ctx = canvas.getContext("2d");
    const cellSize = Math.floor(canvas.width / numCells);
    const drawGrid = () => {
        ctx.strokeStyle = "#333";
        ctx.beginPath();
        for (let i = 0; i < numCells + 1; i++) {
            ctx.moveTo(i * cellSize, 0);
            ctx.lineTo(i * cellSize, cellSize * numCells);
            ctx.moveTo(0, i * cellSize);
            ctx.lineTo(cellSize * numCells, i * cellSize);
        }
        ctx.stroke();
    };
    const fillCell = (x, y, color = "black") => {
        const padding = cellSize / 10;
        const margin = cellSize / 5;
        ctx.fillStyle = color;
        ctx.fillRect(x * cellSize + padding, y * cellSize + padding, cellSize - margin, cellSize - margin);
    };
    const clear = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    const getCellCoordinates = (x, y) => {
        return {
            x: Math.floor(x / cellSize),
            y: Math.floor(y / cellSize),
        };
    };
    const renderBoard = (serverBoard = []) => {
        serverBoard.forEach((row, y) => {
            row.forEach((color, x) => {
                color && fillCell(x, y, color);
            });
        });
    };
    const reset = (serverBoard) => {
        clear();
        drawGrid();
        renderBoard(serverBoard);
    };
    return { fillCell, reset, getCellCoordinates, renderBoard };
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
    const { fillCell, reset, getCellCoordinates } = getBoard(canvas);
    const onCanvasClick = (event) => {
        const { x, y } = getClickCoordinates(canvas, event);
        sock.emit("turn", getCellCoordinates(x, y));
    };
    sock.on("board", (serverBoard) => {
        reset(serverBoard); // draw the squares on the canvas
    });
    sock.on("message", (text) => {
        log(text);
    });
    sock.on("turn", ({ x, y, color }) => {
        fillCell(x, y, color);
    });
    // sock.on("joined", (turns = []) => {
    //     for (let { x, y, color } of turns) {
    //         fillCell(x, y, color);
    //     }
    // });
    chatForm.addEventListener("submit", (event) => {
        onChatSubmitted(sock)(event);
    });
    canvas.addEventListener("click", (event) => {
        onCanvasClick(event);
    });
})();
