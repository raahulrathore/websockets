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
  // console.log(`connected with socket id: ${socket.id}`);

  //joined room
  socket.on("join_room", (roomid) => {
    socket.join(roomid);
    console.log(`joined room: ${roomid}, socket id: ${socket.id}`);
    socket.on("message", (data) => {
      console.log(data, roomid);
      // socket.broadcast.to(data).emit("receive", data);
      socket.to(roomid).emit("receive", data);
    });
  });
  // socket.on("message", (data) => {
  // console.log(data);
  //   socket.broadcast.emit("receive", data);
  // socket.broadcast.to(data).emit("receive", data);
  // });
});

server.listen(3001, () => {
  console.log("listening on Port : 3001");
});
