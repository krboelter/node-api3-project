const express = require('express');
const db = require("./postDb");

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(posts => {
      return res.status(200).json(posts)
    })
    .catch(err => {
      return res.status(500).json({ message: "Internal server error..."})
    })
});

router.get('/:id', (req, res) => {
  const id = req.params.id

  db.getById(id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({ message: "There is no post with that id."})
    })
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
