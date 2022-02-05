const http = require("http");
const express = require("express");

const app = express();

app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);

server.on("error", (error) => {
    console.error(error.message);
});

server.listen(8080, () => {
    console.log("server is ready");
});

console.log("hello world");
