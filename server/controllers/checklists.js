const express = require('express');
const router = express.Router();
const Checklist = require('../models/checklist');
const User = require('../models/user');

// POST checklist
// should not be exposed? owner needed.
// router.post('/api/checklists', async (req, res) => {
//     const checklist = new Checklist(req.body);
//     await checklist.save();
//     res.status(201).send(checklist);
// });

// GET all checklists
router.get('/api/checklists', async (req, res) => {
    try {
        const checklist = await Checklist.find();
        res.status(200).send(checklist);
    } catch {
        res.status(500).send({ message: 'Error in GET checklists', error: error.message });
    }
});

// GET checklist (id)
router.get('/api/checklists/:id', async (req, res) => {
    try {
        const checklist = await Checklist.findOne({_id:req.params.id});
        if (!checklist) {
            return res.status(404).send({ message: 'Checklist not found' });
        }
        res.status(200).send(checklist);
    } catch (error) {
        res.status(500).send({ message: 'Error in GET checklists/id', error: error.message });
    }
});

// PUT checklist (id)
router.put('/api/checklists/:id', async (req, res) => {
    try {
        const checklist = await Checklist.findOneAndUpdate({_id:req.params.id}, req.body, { new: true });
        if (!checklist) {
            return res.status(404).send({ message: 'Checklist not found' });
        }
        res.status(200).send(checklist);
    } catch (error) {
        res.status(500).send({ message: 'Error in PUT checklists/id', error: error.message });
    }
});

// // PATCH checklists (update total cost)
// // Note: work in progress
// router.patch('/api/checklists', async(req, res) => {
//     // Checklist.find().then(
//     //     aggregate(....)
//     // )
// });

// DELETE all checklists
// Note: fix for owners needed (decoupling)
// router.delete('/api/checklists', async (req, res) => {
//     try {
//         await Checklist.deleteMany({});
//         res.status(200).send({ message: 'Success' });
//     } catch (error) {
//         res.status(500).send({ message: 'Error in DELETE checklists', error: error.message });
//     }
// });

// DELETE checklist (id)
// should probably not be exposed, use DELETE /users/:uid/checklists/:cid instead

// POST checklist to user (owner)
router.post('/api/users/:id/checklists', async (req, res) => {
    try {
        var checklist = new Checklist(req.body);
        const user = await User.findById(req.params.id);
        if (!user) {
            return userres.status(404).send({message: "User not found"});
        }
        checklist.owner = user;
        await checklist.save();
        user.checklists.push(checklist);
        await user.save();
        res.status(201).send(checklist);
    } catch {
        res.status(500).send({ message: 'Error in POST /users/id/checklists', error: error.message });
    }
});

// GET user's checklists
router.get('/api/users/:id/checklists', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({message: "User not found"});
        }
        res.send(user.checklists);
    } catch (error) {
        res.status(500).send({ message: 'Error in GET /users/id/checklists/', error: error.message });
    }
});

// GET user's checklist (id)
router.get('/api/users/:uid/checklists/:cid', async (req, res) => {
    try {
        const user = await User.findById(req.params.uid);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const checklist = await Checklist.findOne({_id: req.params.cid, owner: req.params.uid});
        if (!checklist) {
            return res.status(404).send({ message: "Checklist not found" });
        }
        res.send(checklist);
    } catch (error) {
        res.status(500).send({ message: 'Error in GET /users/uid/checklists/cid', error: error.message });
    }
});

// PUT user's checklist (id)
router.put('/api/users/:uid/checklists/:cid', async(req, res) => {
    try {
        const user = await User.findById(req.params.uid);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const checklist = await Checklist.findOneAndUpdate({_id: req.params.cid, owner: req.params.uid}, req.body, {new: true});
        if (!checklist) {
            return res.status(404).send({ message: "Checklist not found" });
        }
        checklist.owner = user;
        await checklist.save();
        await user.save();
        res.status(200).send(user);
    } catch {
        res.status(500).send({ message: 'Error in PUT /users/uid/checklists/cid', error: error.message });
    }
});

// DELETE user's checklists
router.delete('/api/users/:uid/checklists', async (req, res) => {
    try {
        const user = await User.findById(req.params.uid)
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        var result = await Checklist.deleteMany({ owner: req.params.uid });
        await user.save();
        res.status(200).send(result);
    } catch {
        res.status(500).send({ message: 'Error in DELETE /users/uid/checklists', error: error.message });
    }
}); 

// DELETE user's checklist (id)
router.delete('/api/users/:uid/checklists/:cid', async (req, res) => {
    try {
        const checklist = await Checklist.findOneAndDelete({ _id: req.params.cid, owner: req.params.uid });
        if (!checklist) {
            return res.status(404).send({ message: "Checklist not found" });
        }
        res.status(200).send(checklist);
    } catch {
        res.status(500).send({ message: 'Error in DELETE /users/uid/checklists/cid', error: error.message });
    }
});

module.exports = router;
