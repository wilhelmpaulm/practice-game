const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const randomColor = require("randomcolor");
const createBoard = require("./create-board");

const app = express();

app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);
const io = socketio(server);
const { getBoard, makeTurn } = createBoard(5);
// let turns = [];

io.on("connection", (socket) => {
    const color = randomColor();

    socket.emit("message", "you have joined the game");
    socket.emit("board", getBoard());
    // socket.emit("joined", turns);

    socket.on("message", (text) => {
        io.emit("message", text);
    });

    socket.on("turn", ({ x, y }) => {
        // add turn to history
        // turns = [...turns, { x, y, color }];

        makeTurn(x, y, color);
        io.emit("message", `player ${color} turn has been made x:${x} y:${y}`);
        io.emit("turn", { x, y, color });
    });
});

server.on("error", (error) => {
    console.error(error.message);
});

server.listen(8080, () => {
    console.log("server is ready");
});

console.log("hello world");
