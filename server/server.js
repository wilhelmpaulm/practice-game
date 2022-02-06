const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();

app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);
const io = socketio(server);
let turns = [];

io.on("connection", (socket) => {
    socket.emit("message", "you have joined the game");
    socket.emit("joined", turns);

    socket.on("message", (text) => {
        io.emit("message", text);
    });

    socket.on("turn", ({x, y}) => {
        turns = [...turns, {x, y}];
        io.emit("message", `a turn has been made x:${x} y:${y}`);
        io.emit("turn", {x, y});
    });
});

server.on("error", (error) => {
    console.error(error.message);
});

server.listen(8080, () => {
    console.log("server is ready");
});

console.log("hello world");
