var express = require('express');
var router = express.Router();
var Activity = require('../models/activity');
var Review = require('../models/review');
const activity = require('../models/activity');

/*
This is the previous code that doesn't work due to .save(), .find() not allowing callbacks:
The code below for post is inspired from chatGPT to use async to wait for a response:
*/

// POST activity
router.post('/api/activities', async (req, res, next) => {
    try {
      const activity = new Activity(req.body);
      const savedActivity = await activity.save();
      res.status(201).json(savedActivity);
    } catch (err) {
      next(err); // Pass the error to the error-handling middleware
    }
  });


// GET all activities
router.get('/api/activities', async (req, res, next) => {
    try {
        const activities = await Activity.find();
        res.json({ 'activities': activities });
      } catch (err) {
        return next(err);
      }
});

// GET activity (id)
router.get('/api/activities/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const activity = await Activity.findById(id);
        if (activity == null) {
            return res.status(404).json({ 'message': 'Activity not found' });
        }
        res.json(activity);
    } catch (err) {
        next(err); 
    }
});

// DELETE activity (id)
router.delete('/api/activities/:id', async (req, res, next) => {
    var id = req.params.id;
    var ack = await Activity.deleteOne({_id:id});
    res.status(200).send(ack);
});




//PUT activity (id)
router.put('/api/activities/:id', function(req, res, next) {
    var id = req.params.id;
    Activity.findById(id, function(err, activity) {
        if (err) { return next(err); }
        if (activity == null) {
            return res.status(404).json({"message": "Activity not found"});
        }
        activity.name = req.body.name;
        activity.is_visited = req.body.is_visited;
        activity.is_on_bucketlist = req.body.is_on_bucketlist;
        activity.review = req.body.review;
        activity.save();
        res.json(activity);
    });
});


// POST activities to reviews
router.post('/api/activities/:aid/reviews', async (req, res) => {
    var review = new Review(req.body);
    var aid = req.params.aid;
    Activity.findById(aid).then( async(activity, activityres) => {
        if (activity == null) {
            return activityres.status(404).json({"message": "Activity not found"});
        }
        activity.reviews.push(review);
        await activity.save();
        review.activity = activity;
        await review.save();
        res.status(201).send(review);
    });
});

// GET activities that are reviewed
router.get('/api/activities/:aid/reviews', async (req, res) => {
    var aid = req.params.aid;
    Activity.findById(aid).then( async(activity, activityres) => {
        if (activity == null) {
            return activityres.status(404).json({"message": "Activity not found"});
        }
        Review.findById(activity.reviews).then(async(review, reviewres) => {
            res.json({ 'reviews': review });
        });
    });
});

//GET specific review (id) of an activity
router.get('/api/activities/:aid/reviews/:rid', async (req, res) => {
    var aid = req.params.aid;
    var rid = req.params.rid;
    User.findById(aid).then( async(activity, activityres) => {
        if (activity == null) {
            return activityres.status(404).json({"message": "Activity not found"});
        }
        Review.findOne({_id: rid, activity: aid}).then(async(review, reviewres) => {
            if (review == null) {
                return reviewres.status(404).json({"message": "Review not found"});
            }
            res.json({ 'reviews': review });
        });
    });
});

// DELETE a specific review (id) for an activity
// TODO

module.exports = router;