/*
*   This code module is a collection of route handlers for CRUD operations (Create, Read, Update, Delete) 
*   on three types of entities: Checklists, Activities, and Reviews, all associated with a Location. Express.js 
*   framework is used for handling the HTTP requests. 
*
*   Each of the CRUD operations below is associated with a specific HTTP method and endpoint:
*   - POST: Used for creating a new entity (Checklist, Activity, Review).
*   - GET: Used for retrieving entities.
*   - DELETE: Used for deleting an entity.
*
*   Note: The Update (PUT) operation is not present in this code.
*
*   The operations are asynchronous, using the `async/await` syntax to handle asynchronous database operations.
*   SUGGESTIONS:
*   -  Delete Operations: Ensure child item references are removed from the parent (Location) when deleted.
*   - Validation: Validate data before saving to prevent malicious input or errors.
*   - Check Location Existence: Verify if a location exists before adding related items; return an error if not found.
*/

const express = require('express');
const router = express.Router();
const Location = require('../models/location');
const Checklist = require('../models/checklist');
const Activity = require('../models/activity');
const Review = require('../models/review');

// POST Create Location
router.post('/locations', async (req, res) => {
    try {
        const location = new Location(req.body);
        await location.save();
        res.status(201).send(location);
    } catch (error) {
        res.status(500).send({ message: 'Error creating location', error: error.message });
    }
});

/* CHECKLISTS ROUTES */
// POST Create Checklist for a Location 
router.post('/locations/:location_id/checklists', async (req, res) => {
    try {
        const location = await Location.findById(req.params.location_id);
        const checklist = new Checklist(req.body);
        checklist.location = location._id;
        await checklist.save();
        location.checklists.push(checklist);
        await location.save();
        res.status(201).send(checklist);
    } catch (error) {
        res.status(500).send({ message: 'Error creating checklist for location', error: error.message });
    }
});

// GET Checklists for a Location
router.get('/locations/:location_id/checklists', async (req, res) => {
    try {
        const location = await Location.findById(req.params.location_id).populate('checklists');
        res.send(location.checklists);
    } catch (error) {
        res.status(500).send({ message: 'Error getting checklists for a location', error: error.message });
    }
});

// GET Specific Checklist for a Location
router.get('/locations/:location_id/checklists/:checklist_id', async (req, res) => {
    try {
        const checklist = await Checklist.findById(req.params.checklist_id);
        res.send(checklist);
    } catch (error) {
        res.status(500).send({ message: 'Error getting specific checklist for a location', error: error.message });
    }
});

// DELETE Checklist from a Location
router.delete('/locations/:location_id/checklists/:checklist_id', async (req, res) => {
    try {
        const checklist = await Checklist.findByIdAndRemove(req.params.checklist_id);
        res.send({message: 'Checklist removed', checklist});
    } catch (error) {
        res.status(500).send({ message: 'Error deleting checklist from a location', error: error.message });
    }
});


/*  ACTIVITIES ROUTES */
//POST Create Activity for a Location
router.post('/locations/:location_id/activities', async (req, res) => {
    try {
        const location = await Location.findById(req.params.location_id);
        const activity = new Activity(req.body);
        activity.location = location._id;
        await activity.save();
        location.activities.push(activity);
        await location.save();
        res.status(201).send(activity);
    } catch (error) {
        res.status(500).send({ message: 'Error creating activity for a location', error: error.message });
    }
});

//GET Activities for a Location
router.get('/locations/:location_id/activities', async (req, res) => {
    try {
        const location = await Location.findById(req.params.location_id).populate('activities');
        res.send(location.activities);
    } catch (error) {
        res.status(500).send({ message: 'Error getting activities for a location', error: error.message });
    }
});

//GET Specific Activity for a Location
router.get('/locations/:location_id/activities/:activity_id', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.activity_id);
        res.send(activity);
    } catch (error) {
        res.status(500).send({ message: 'Error getting specific activity for a location', error: error.message });
    }
});

//DELETE Activity from a Location
router.delete('/locations/:location_id/activities/:activity_id', async (req, res) => {
    try {
        const activity = await Activity.findByIdAndRemove(req.params.activity_id);
        res.send({message: 'Activity removed', activity});
    } catch (error) {
        res.status(500).send({ message: 'Error deleting activity from a location', error: error.message });
    }
});


/* REVIEWS ROUTES */
//POST Create Review for a Location
router.post('/locations/:location_id/reviews', async (req, res) => {
    try {
        const location = await Location.findById(req.params.location_id);
        const review = new Review(req.body);
        review.location = location._id;
        await review.save();
        location.reviews.push(review);
        await location.save();
        res.status(201).send(review);
    } catch (error) {
        res.status(500).send({ message: 'Error creating review for a location', error: error.message });
    }
});

//GET Reviews for a Location
router.get('/locations/:location_id/reviews', async (req, res) => {
    try {
        const location = await Location.findById(req.params.location_id).populate('reviews');
        res.send(location.reviews);
    } catch (error) {
        res.status(500).send({ message: 'Error getting reviews for a location', error: error.message });
    }
});

//GET Specific Review for a Location
router.get('/locations/:location_id/reviews/:review_id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.review_id);
        res.send(review);
    } catch (error) {
        res.status(500).send({ message: 'Error getting specific review for a location', error: error.message });
    }
});

//DELETE Review from a Location
router.delete('/locations/:location_id/reviews/:review_id', async (req, res) => {
    try {
        const review = await Review.findByIdAndRemove(req.params.review_id);
        res.send({message: 'Review removed', review});
    } catch (error) {
        res.status(500).send({ message: 'Error deleting review from a location', error: error.message });
    }
});

module.exports = router;
