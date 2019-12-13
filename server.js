const express = require('express');
const server = express();

const usersRouter = require("./users/userRouter")
const postsRouter = require("./posts/postRouter")

server.use(express.json())
server.use(logger)

server.get("/", (req, res) => {
  res.json({
      message: "Welcome to the API",
      connection: process.env.CONNECTION
  })
})

server.use("/api/users", logger, usersRouter)
server.use("/api/posts",logger, postsRouter)

//custom middleware

function logger(req, res, next) {
  console.log(`Method: ${req.method} URL: http://localhost:5000${req.url} Timestamp: ${Date.now()}`)
  
  next()
}

module.exports = server;
