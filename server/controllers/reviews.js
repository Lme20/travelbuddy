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
const User = require('../models/user');

// POST Create Review for a User
router.post('/api/users/:id/reviews', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        
        const review = new Review({
            ...req.body,
            userId: user.id  // note: it's 'userId' to match the review schema
        });
        await review.save();
        user.reviews.push(review.id);
        await user.save();
        
        res.status(201).send(review);
    } catch (error) {
        res.status(500).send({ message: "Error creating review", error: error.message });
    }
});

//GET All Reviews of a User
router.get('/api/users/:id/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({ userId: req.params.id }).select('stars text _id');
        res.status(200).send(reviews);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving reviews", error: error.message });
    }
});

//GET a Specific Review of a User
router.get('/api/users/:userId/reviews/:reviewId', async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId).populate('userId'); // Populating the userId field

        if (!review) { // Check if the review exists
            return res.status(404).send({ message: "Review not found" });
        }
        if (review.userId._id.toString() !== req.params.userId) { // Check if the review's userId matches the provided userId
            return res.status(404).send({ message: "Review not found for this user" });
        }
        // Respond with the review data
        res.status(200).send(review);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving specific review", error: error.message });
    }
});

//DELETE a Specific Review of a User
router.delete('/api/users/:userId/reviews/:reviewId', async (req, res) => {
    try {
        const review = await Review.findOneAndDelete({ 
            _id: req.params.reviewId, 
            userId: req.params.userId 
        });

        if (!review) {
            return res.status(404).send({ message: "Specific review not found" });
        }
        res.status(200).send({ message: "Specific review deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting specific review", error: error.message });
    }
});


// PUT


// PATCH 

module.exports = router;
