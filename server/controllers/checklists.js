const express = require('express');
const router = express.Router();
const Checklist = require('../models/checklist');
const User = require('../models/user');
const user = require('../models/user');

// // should not be exposed? owner needed.
// router.post('/api/checklists', async (req, res) => {
//     const checklist = new Checklist(req.body);
//     await checklist.save();
//     res.status(201).send(checklist);
// });

// GET all checklists
router.get('/api/checklists', async (req, res) => {
    const checklist = await Checklist.find();
    res.json({'checklists': checklist});
    res.status(200).send(checklist);
});

// PATCH checklists (update total cost)
router.patch('/api/checklists', async(req, res) => {
    // Checklist.find().then(
    //     aggregate(....)
    // )
});

// POST checklist to user (owner)
router.post('/api/users/:id/checklists', async (req, res) => {
    var checklist = new Checklist(req.body);
    User.findById(req.params.id).then( async(user, userres) => {
        if (user == null) {
            return userres.status(404).json({message: "Owner not found"});
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
    User.findById(req.params.id).then( async(user, userres) => {
        if (user == null) {
            return userres.status(404).json({message: "User not found"});
        }
        Checklist.findById(user.checklists).then(async(cl, clres) => {
            res.json({ 'checklists': cl });
        });
    });
});

// GET user's checklist (id)
router.get('/api/users/:uid/checklists/:cid', async (req, res) => {
    User.findById(req.params.uid).then( async(user, userres) => {
        if (user == null) {
            return userres.status(404).json({ message: "User not found" });
        }
        Checklist.findOne({_id: req.params.cid, owner: req.params.uid}).then(async(cl, clres) => {
            if (cl == null) {
                return clres.status(404).json({ message: "Checklist not found" });
            }
            res.json({ 'checklists': cl });
        });
    });
});

// PUT user's checklist (id)
// TODO test
router.put('/api/users/:uid/checklists/:cid', async(req, res) => {
    User.findById(req.params.uid).then( async (ureq, ures) => {
        if (user == null) {
            return userres.status(404).json({ message: "User not found" });
        }
        Checklist.findOne({_id: req.params.cid, owner: req.params.uid}).then(async(cl, clres) => {
            if (cl == null) {
                return clres.status(404).json({ message: "Checklist not found" });
            }
            cl = req.body.checklists;
            user.checklists = cl;
            await cl.save();
            await user.save();
            res.status(200).send(user);
        });
    });
});

// DELETE user's checklists
// TODO not working as expected
router.delete('/api/users/:uid/checklists', async (req, res) => {
    User.findById(req.params.uid).then( async(user, userres) => {
        if (user == null) {
            return userres.status(404).json({ message: "User not found" });
        }
        var result = await Checklist.deleteMany({ owner: req.params.uid });
        await user.save();
        res.status(200).send(result);
    });
}); 

// DELETE user's checklist (id)
router.delete('/api/users/:uid/checklists/:cid', async (req, res) => {
    var checklist = await Checklist.findOneAndDelete({ _id: req.params.cid, owner: req.params.uid });
    if (!checklist) {
        return res.status(404).send({ message: "Checklist not found" });
    }
    res.status(200).send(checklist);
});

module.exports = router;
