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
*   - Validation: Validate data before saving to prevent malicious input or errors.
*   - Check Location Existence: Verify if a location exists before adding related items; return an error if not found.
*/
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Location = require('../models/location');

// POST Create Location OK
router.post('/api/locations', async (req, res) => {
    try {
        const location = new Location(req.body);
        await location.save();
        res.status(201).send(location);
    } catch (error) {
        res.status(500).send(location);
    }
});

// GET All locations OK
router.get('/api/locations', async (req, res) => {
    try {
        const locations = await Location.find({});
        res.status(200).send(locations);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching locations', error: error.message });
    }
});

// Delete All locations OK
router.delete('/api/locations', async (req, res) => {
    try {
        await Location.deleteMany({});
        res.status(200).send({ message: 'All locations deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting locations', error: error.message });
    }
});

// Delete single locations OK
router.delete('/api/locations/:id', async (req, res) => {
    try {
        await Location.deleteMany({});
        res.status(200).send({ message: 'location deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting location', error: error.message });
    }
});

// GET Single location by ID - OK
router.get('/api/locations/:id', async (req, res) => {
    var id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid ID format' });
    }
    try {
        const location = await Location.findOne({_id:id})
        if (!location) return res.status(404).send({ message: 'Location not found' });
        res.status(200).send(location);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching location', error: error.message });
    }
});


// PUT (update) Single location by ID - OK
router.put('/api/locations/:id', async (req, res) => {
    try {
        var id = req.params.id;
        const location = await Location.findOneAndUpdate({_id:id}, req.body, { new: true });
        if (!location) return res.status(404).send({ message: 'Location not found' });
        res.status(200).send(location);
    } catch (error) {
        res.status(500).send({ message: 'Error updating location', error: error.message });
    }
});

// PATCH (partial update) Single location by ID - OK
router.patch('/api/locations/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const location = await Location.findByIdAndUpdate(id, req.body, { new: true });
        if (!location) return res.status(404).send({ message: 'Location not found' });
        res.status(200).send(location);
    } catch (error) {
        res.status(500).send({ message: 'Error partially updating location', error: error.message });
    }
});

/* CHECKLISTS ROUTES */
/* POST Create Checklist for a Location 
router.post('api/locations/:location_id/checklists', async (req, res) => {
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
});*/

/* GET Checklists for a Location
router.get('api/locations/:location_id/checklists', async (req, res) => {
    try {
        const location = await Location.findById(req.params.location_id).populate('checklists');
        res.send(location.checklists);
    } catch (error) {
        res.status(500).send({ message: 'Error getting checklists for location', error: error.message });
    }
});*/

/* GET Specific Checklist for a Location
router.get('api/locations/:location_id/checklists/:checklist_id', async (req, res) => {
    try {
        const checklist = await Checklist.findById(req.params.checklist_id);
        res.send(checklist);
    } catch (error) {
        res.status(500).send({ message: 'Error getting specific checklist for location', error: error.message });
    }
});*/

/* DELETE Checklist from a Location
router.delete('api/locations/:location_id/checklists/:checklist_id', async (req, res) => {
    try {
        // Deleting  checklist
        const checklist = await Checklist.findByIdAndRemove(req.params.checklist_id);
        
        // Removing reference from location
        const location = await Location.findById(req.params.location_id);
        location.checklists.pull(req.params.checklist_id);
        await location.save();

        res.send({message: 'Checklist removed', checklist});
    } catch (error) {
        res.status(500).send({ message: 'Error deleting checklist from location', error: error.message });
    }
});*/


/*  ACTIVITIES ROUTES */
/*POST Create Activity for a Location
router.post('api/locations/:location_id/activities', async (req, res) => {
    try {
        const location = await Location.findById(req.params.location_id);
        const activity = new Activity(req.body);
        activity.location = location._id;
        await activity.save();
        location.activities.push(activity);
        await location.save();
        res.status(201).send(activity);
    } catch (error) {
        res.status(500).send({ message: 'Error creating activity for location', error: error.message });
    }
});*/

/*GET Activities for a Location
router.get('api/locations/:location_id/activities', async (req, res) => {
    try {
        const location = await Location.findById(req.params.location_id).populate('activities');
        res.send(location.activities);
    } catch (error) {
        res.status(500).send({ message: 'Error getting activities for location', error: error.message });
    }
});*/

/*GET Specific Activity for a Location
router.get('api/locations/:location_id/activities/:activity_id', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.activity_id);
        res.send(activity);
    } catch (error) {
        res.status(500).send({ message: 'Error getting specific activity for location', error: error.message });
    }
});*/

/*DELETE Activity from a Location
router.delete('api/locations/:location_id/activities/:activity_id', async (req, res) => {
    try {
        // Deleting  activity
        const activity = await Activity.findByIdAndRemove(req.params.activity_id);
        
        // Removing reference from location
        const location = await Location.findById(req.params.location_id);
        location.activities.pull(req.params.activity_id);
        await location.save();

        res.send({message: 'Activity removed', activity});
    } catch (error) {
        res.status(500).send({ message: 'Error deleting activity from location', error: error.message });
    }
});*/


/* REVIEWS ROUTES */
/*POST Create Review for a Location
router.post('/api/locations/:id/reviews', async (req, res) => {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).send({ message: "User with provided userId not found" });
    }

    console.log(req.body);
    try {
        const location = await Location.findById(req.params.id);   
        // Check if the location exists
        if (!location) {
            return res.status(404).send({ message: 'Location not found' });
        }

        const review = new Review(req.body);
        review.location = location.id;
        await review.save();
        
        location.reviews.push(review);
        await location.save();
        res.status(201).send(review);

    } catch (error) {
        res.status(500).send({ message: 'Error creating review for location', error: error.message });
    }
});


//GET Reviews for a Location
router.get('api/locations/:location_id/reviews', async (req, res) => {
    try {
        const location = await Location.findById(req.params.location_id).populate('reviews');
        res.send(location.reviews);
    } catch (error) {
        res.status(500).send({ message: 'Error getting reviews for location', error: error.message });
    }
});

//GET Specific Review for a Location
router.get('api/locations/:location_id/reviews/:review_id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.review_id);
        res.send(review);
    } catch (error) {
        res.status(500).send({ message: 'Error getting specific review for location', error: error.message });
    }
});

//DELETE Review from a Location
router.delete('api/locations/:id/reviews', async (req, res) => {
    try {
        // Deleting  review
        const review = await Review.findByIdAndRemove(req.params.review_id);
        
        // Removing reference from location
        const location = await Location.findById(req.params.location_id);
        location.reviews.pull(req.params.review_id);
        await location.save();

        res.send({message: 'Review removed', review});
    } catch (error) {
        res.status(500).send({ message: 'Error deleting review from location', error: error.message });
    }
});*/

module.exports = router;
