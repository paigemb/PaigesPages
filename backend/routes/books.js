/*Route for /books endpoint */
const router = require("express").Router();
let Book = require("../models/book.model");

// root url: localhost:8888/books

//return list of all book model entries in database
router.route("/").get((req, res) => {
  Book.find() //.find returns a promise, result returned in json format
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json("Error:" + err));
});

//adds a book model entry
router.route("/add").post((req, res) => {
  const title = req.body.title;
  const pageCount = Number(req.body.pageCount);
  const newTitle = new Book({ title, pageCount });

  newTitle
    .save()
    .then(() => res.json("Book added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
