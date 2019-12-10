const express = require('express');
const server = express();

const usersRouter = require("./users/userRouter")
const postsRouter = require("./posts/postRouter")

server.use(express.json())

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use("/api/users", usersRouter)
server.use("/api/posts", postsRouter)

//custom middleware

// function logger(req, res, next) {
//   console.log(`Method: ${req.method} URL: ${req.url} Timestamp: ${req.timestamp}`)

//   next()
// }

module.exports = server;
