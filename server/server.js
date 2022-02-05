const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();

app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
    socket.emit("message", "you are connected");

    socket.on("message", (text) => {
        io.emit("message", text);
    });
});

server.on("error", (error) => {
    console.error(error.message);
});

server.listen(8080, () => {
    console.log("server is ready");
});

console.log("hello world");
