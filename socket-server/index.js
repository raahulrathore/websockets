const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`connected with socket id: ${socket.id}`);

  socket.on("message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive", data);
  });
});

server.listen(3001, () => {
  console.log("listening on Port : 3001");
});
