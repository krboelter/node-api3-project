const express = require('express');
const postDb = require("./postDb");

const router = express.Router();

router.get('/', (req, res) => {
  postDb.get()
    .then(posts => {
      return res.status(200).json(posts)
    })
    .catch(err => {
      return res.status(500).json({ message: "Internal server error..."})
    })
});

router.get('/:id', validatePostId, (req, res) => {
  res.json(req.post)
});

router.delete('/:id', validatePostId, (req, res) => {
  postDb.remove(req.params.id)
    .then(post => {
      if (!post) {
        res.status(404).json({ message: "Post could not be deleted." })
      } else {
        res.status(200).json({ message: "Removed successfuly." })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not remove post." })
    })
});

router.put('/:id', validatePostId, (req, res) => {
  const id = req.params.id
  const post = {
    text: req.body.text,
    user_id: id
  }

  postDb.update(id, post)
    .then(post => {
      if (post < 1) {
        res.status(404).json({ message: "Post was not deleted." })
      } else {
        res.status(200).json({ message: "Post was deleted!" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Internal server error..." })
    })
});

// custom middleware

function validatePostId(req, res, next) {
  postDb.getById(req.params.id)
    .then(post => {
      if (!post) {
        res.status(400).json({ message: "There is no post with that id." })
      } else {
        req.post = post
        next()
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Internal service error." })
    })
}

module.exports = router;
