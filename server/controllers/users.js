const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Checklist = require('../models/checklist');

// POST user
router.post('/api/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
});

// GET all users
router.get('/api/users', async (req, res) => {
    const user = await User.find();
    //res.json({'users': user});
    res.status(200).send(user);
});

// DELETE user (id)
router.delete('/api/users/:id', async(req, res) => {
    var id = req.params.id;
    var ack = await User.deleteOne({_id:id});
    res.status(200).send(ack);
});

// PUT user (id)
// TODO

// POST checklist to user (owner)
router.post('/api/users/:id/checklists', async (req, res) => {
    var checklist = new Checklist(req.body);
    var id = req.params.id;
    User.findById(id).then( async(user, userres) => {
        if (user == null) {
            return userres.status(404).json({"message": "Owner not found"});
        }
        user.checklists.push(checklist);
        await user.save();
        checklist.owner = user;
        await checklist.save();
        res.status(201).send(checklist);
    });
});

// GET user's checklists
router.get('/api/users/:id/checklists', async (req, res) => {
    var id = req.params.id;
    User.findById(id).then( async(user, userres) => {
        if (user == null) {
            return userres.status(404).json({"message": "User not found"});
        }
        Checklist.findById(user.checklists).then(async(cl, clres) => {
            res.json({ 'checklists': cl });
        });
    });
});

// GET user's checklist (id)
router.get('/api/users/:uid/checklists/:cid', async (req, res) => {
    var uid = req.params.uid;
    var cid = req.params.cid;
    User.findById(uid).then( async(user, userres) => {
        if (user == null) {
            return userres.status(404).json({"message": "User not found"});
        }
        Checklist.findOne({_id: cid, owner: uid}).then(async(cl, clres) => {
            if (cl == null) {
                return clres.status(404).json({"message": "Checklist not found"});
            }
            res.json({ 'checklists': cl });
        });
    });
});

// PUT user's checklist (id)
// TODO

// DELETE user's checklists
// TODO

// DELETE user's checklist (id)
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