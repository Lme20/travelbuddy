/*
* This code establishes API endpoints to manage reviews associated with users and 
* performs CRUD (Create, Read, Update, Delete) operations on reviews.
*
* -- POST Create Review:
*       The POST route allows clients to create a new review associated with a user. 
* -- GET All Reviews of a User:
*       This GET route fetches all the reviews written by a specific user.
* -- GET a Specific Review of a User:
*       This endpoint fetches a specific review written by a user.
* -- DELETE a Specific Review of a User:
*       This route deletes a specified review associated with a user. 
*/

const express = require('express');
const router = express.Router();
const Review = require('../models/review');

// POST Create Review
router.post('/users/:user_id/reviews', async (req, res) => {
    const review = new Review({
        ...req.body,
        userId: req.params.user_id
    });
    await review.save();
    res.status(201).send(review);
});

/*GET All Reviews of a User
router.get('/users/:user_id/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({ userId: req.params.user_id });
        res.status(200).send(reviews);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving reviews" });
    }
});

//GET a Specific Review of a User
router.get('/users/:user_id/reviews/:review_id', async (req, res) => {
    try {
        const review = await Review.findOne({ _id: req.params.review_id, userId: req.params.user_id });
        if (!review) {
            return res.status(404).send({ message: "Specific review not found" });
        }
        res.status(200).send(review);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving specific review" });
    }
});

//DELETE a Specific Review of a User
router.delete('/users/:user_id/reviews/:review_id', async (req, res) => {
    try {
        const review = await Review.findOneAndDelete({ _id: req.params.review_id, userId: req.params.user_id });
        if (!review) {
            return res.status(404).send({ message: "Specific review not found" });
        }
        res.status(200).send({ message: "Specific review deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting specific review" });
    }
});*/

module.exports = router;
