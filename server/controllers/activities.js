var express = require('express');
var router = express.Router();
var Activity = require('../models/activity');

/*
This is the previous code that doesn't work due to .save(), .find() not allowing callbacks:
The code below for post is inspired from chatGPT to use async to wait for a response:
*/

router.post('/api/activities', async (req, res, next) => {
    try {
      const activity = new Activity(req.body);
      const savedActivity = await activity.save();
      res.status(201).json(savedActivity);
    } catch (err) {
      next(err); // Pass the error to the error-handling middleware
    }
  });

router.get('/api/activities', async (req, res, next) => {
    try {
        const activities = await Activity.find();
        res.json({ 'activities': activities });
      } catch (err) {
        return next(err);
      }
});

router.get('/api/activities/:id', function(req, res, next) {
    var id = req.params.id;
    Activity.findById(id, function(err, activity) {
        if (err) { return next(err); }
        if (activity === null) {
            return res.status(404).json({'message': 'Activity not found'});
        }
        res.json(activity);
    });
});

router.delete('/api/activities/:id', function(req, res, next) {
    var id = req.params.id;
    Activity.findOneAndDelete({_id: id}, function(err, activity) {
        if (err) { return next(err); }
        if (activity === null) {
            return res.status(404).json({'message': 'Activity not found'});
        }
        res.json(activity);
    });
});



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


module.exports = router;