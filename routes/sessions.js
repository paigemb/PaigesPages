const router = require('express').Router();
let Reading = require('../models/reading.model');

router.route('/').get((req,res) => {
    Reading.find()
        .then(sessions => res.json(sessions))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add').post((req, res) => {
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

    newSession.save()
    .then(() => res.json('Session added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router
