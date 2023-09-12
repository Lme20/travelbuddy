const express = require('express');
const router = express.Router();
const Review = require('../models/review');

// POST Create Review
router.post('/users/:user_id/reviews', async (req, res) => {
    const review = new Review(req.body);
    await review.save();
    res.status(201).send(review);
});

//other CRUD operations here

module.exports = router;
