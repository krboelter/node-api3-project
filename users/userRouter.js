const express = require('express');
const db = require("./userDb")

const router = express.Router();

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  db.get()
    .then(users => {
      return res.status(200).json(users)
    })
    .catch(err => {
      return res.status(500).json({ message: "Cannot reach page."})
    })
});

router.get('/:id',validateUserId(), (req, res) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
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
    db.getById()
      .then(user => {
        req.user = user
        next()
      })
      .catch(err => {
        json.sttaus(500).json({ message: "Internal server error..."})
      })
  }
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
