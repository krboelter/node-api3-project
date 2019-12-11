const express = require('express');
const userDb = require("./userDb")
const postDb = require("../posts/postDb")


const router = express.Router();

router.post('/:id/posts', validatePost(), (req, res) => {
  res.status(200).json(req.newPost)
});

router.get('/', (req, res) => {
  userDb.get()
    .then(users => {
      return res.status(200).json(users)
    })
    .catch(err => {
      return res.status(500).json({ message: "Cannot reach page." })
    })
});

router.get('/:id',validateUserId(), (req, res) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts',validateUserId(), (req, res) => {
  res.status(200).json({ 
    message: `${req.user.name} posted:`,
    posts: req.posts
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId() {
  return (req, res, next)  => {
    const id = req.params.id

    userDb.getById(id)
      .then(user => {
        if (!user) {
          res.status(400).json({ message: "Invalid user id." })
        } else {
          req.user = user
          next()
        }
      })
      .catch(err => {
        json.sttaus(500).json({ message: "Internal server error..." })
      })
  }
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost() {
  return (req, res, next) => {
    const id = req.params.id
    const post = {
      text: req.body.text,
      user_id: id
    }

    postDb.insert(post)
      .then(newPost => {
        req.newPost = newPost
        next()
      })
      .catch(err => {
        res.status(500).json({ message: "Internal server error..." })
      })
  }
}

module.exports = router;
