const express = require('express');
const db = require("./postDb");

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(posts => {
      return res.status(200).json(posts)
    })
    .catch(err => {
      return res.status(500).json({ message: "Cannot reach page."})
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
