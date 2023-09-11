var express = require('express');
var router = express.Router();
var Activity = require('../models/activity');

router.post('/api/activities', function(req, res, next){
    var activity = new Activity(req.body);
    activity.save(function(err, activity) {
        if (err) { return next(err); }
        res.status(201).json(activity);
    })
});

router.get('/api/activities', function(req, res, next) {
    Activity.find(function(err, activities) {
        if (err) { return next(err); }
        res.json({'activities': activities });
    });
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