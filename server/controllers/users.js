const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST user
router.post('/api/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
});

// GET all users
router.get('/api/users', async (req, res) => {
    const user = await User.find();
    res.status(200).send(user);
});

// DELETE user (id)
router.delete('/api/users/:id', async(req, res) => {
    var user = await User.findOneAndDelete({_id:req.params.id});
    res.status(200).send(user);
});

// PUT user (id)
// TODO

// POST activities to user
router.post('/api/users/:uid/activites', async (req, res) => {
    var activity = new Activity(req.body);
    var uid = req.params.uid;
    User.findById(uid).then( async(user, userres) => {
        if (user == null) {
            return userres.status(404).json({"message": "User not found"});
        }
        user.activities.push(activity);
        await user.save();
        activity.users = user;
        await activity.save();
        res.status(201).send(activity);
    });
});

// GET user's acitivity (id)
router.get('/api/users/:uid/activities/:aid', async (req, res) => {
    var uid = req.params.uid;
    var aid = req.params.aid;
    User.findById(uid).then( async(user, userres) => {
        if (user == null) {
            return userres.status(404).json({"message": "User not found"});
        }
        Activity.findOne({_id: aid, owner: uid}).then(async(activity, activityres) => {
            if (activity == null) {
                return activityres.status(404).json({"message": "Activity not found"});
            }
            res.json({ 'activities': activity });
        });
    });
});

// GET user's activities
router.get('/api/users/:uid/activities', async (req, res) => {
    var uid = req.params.uid;
    User.findById(uid).then( async(user, userres) => {
        if (user == null) {
            return userres.status(404).json({"message": "User not found"});
        }
        Activity.findById(user.activities).then(async(activity, activityres) => {
            res.json({ 'activities': activity });
        });
    });
});

// DELETE user's activity (id)
// TODO

module.exports = router;