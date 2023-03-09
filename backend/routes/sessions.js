const router = require("express").Router();
let Reading = require("../models/reading.model");

router.route("/").get((req, res) => {
  Reading.find()
    .then((sessions) => res.json(sessions))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const duration = req.body.duration;
  const pagesRead = Number(req.body.pagesRead);
  const date = Date.parse(req.body.date);

  const newSession = new Reading({
    title,
    duration,
    pagesRead,
    date,
  });

  newSession
    .save()
    .then(() => res.json("Session added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Reading.findById(req.params.id) //get session by id
    .then((session) => res.json(session))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Reading.findByIdAndDelete(req.params.id)
    .then(() => res.json("Session deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Reading.findById(req.params.id)
    .then((session) => {
      session.title = req.body.title;
      session.duration = Number(req.body.duration);
      session.pagesRead = Number(req.body.pagesRead);
      session.date = Date.parse(req.body.date);

      session
        .save()
        .then(() => res.json("Session Updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
