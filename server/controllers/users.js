const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Checklist = require('../models/checklist');

router.post('/api/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
});

router.get('/api/users', async (req, res) => {
    const user = await User.find();
    res.json({'users': user});
    res.status(200).send(user);
});

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

module.exports = router;