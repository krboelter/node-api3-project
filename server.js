const express = require('express');
const server = express();

const usersRouter = require("./users/userRouter")
const postsRouter = require("./posts/postRouter")

server.use(express.json())

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use("/api/users", logger, usersRouter)
server.use("/api/posts",logger, postsRouter)

//custom middleware

function logger(req, res, next) {
  console.log(`Method: ${req.method} URL: http://localhost:5000${req.url} Timestamp: ${Date.now()}`)
  
  next()
}

module.exports = server;
