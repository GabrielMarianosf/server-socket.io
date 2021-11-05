const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
  /* options */
});

const chatHistorico = [];

io.on("connection", (socket) => {
  console.log("Conexao Estabelecida, ID: " + socket.id);
  //
  chatHistorico.forEach((msg) => {
    socket.emit("chat", msg);
  });

  socket.on("mensagem", (msg) => {
    //
    console.log(msg);
    chatHistorico.push(msg);
    // console.log(chatHistorico);
    io.emit("chat", msg);
    //
  });

  socket.on("disconnect", (rason) => {
    console.log("Conexao Encerrada " + rason);
  });
  //
});

httpServer.listen(4000);
