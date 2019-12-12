const express = require('express');
const userDb = require("./userDb")
const postDb = require("../posts/postDb")


const router = express.Router();

router.post('/', validateUser, (req, res) => {
  userDb.insert(req.body.name)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(err => {
      res.status(500).json({ message: "User could not be created at this time." })
    })
})

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const post = {
    text: req.body.text,
    user_id: req.params.id
  }

  postDb.insert(post)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      res.status(500).json({ message: "Internal server error." })
    })
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

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  userDb.getUserPosts(req.params.id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({ message: "Internal server error." })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  userDb.remove(req.params.id)
    .then(user => {
      res.status(200).json({ message: "User has been deleted." })
    })
    .catch(err => {
      res.status(500).json({ error: "Unable to delete user." })
    })
});

router.put('/:id', validateUserId, (req, res) => {
  const id = req.params.id
  const updatePost = {
    text: req.body.text,
    user_id: id
  }

  userDb.update(id, updatePost)
    .then(body => {
      res.status(200).json(body)
    })
    .catch(err => {
      res.status(500).json({ message: "Could not update post." })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id

  userDb.getById(id)
    .then(user => {
      if (!user) {
        res.status(400).json({ messge: "Invalid user id." })
      } else {
        req.user = user
        next()
      }
    })
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "Missing user data." })
  } else if (!req.body.name) {
    res.status(400).json({ message: "Missing required field: name" })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "Missing post data." })
  } else if (!req.body.text){
    res.status(400).json({ message: "Missing text data." })
  } else {
    next()
  }  
}

module.exports = router;
