const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST user
router.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch {
        res.status(500).send({ message: 'Error in POST /users', error: error.message });
    }
});

// GET all users
router.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch {
        res.status(500).send({ message: 'Error in GET /users', error: error.message });
    }
});

// GET user (id)
router.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findOne({_id:req.params.id});
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: 'Error in GET users/id', error: error.message });
    }
});

// PUT user (id)
router.put('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({_id:req.params.id}, req.body, { new: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: 'Error in PUT user/id', error: error.message });
    }
});

// DELETE all checklists
// Note: clean up checklist owners (decoupling)
router.delete('/api/users', async (req, res) => {
    try {
        await User.deleteMany({});
        res.status(200).send({ message: 'Success' });
    } catch (error) {
        res.status(500).send({ message: 'Error in DELETE users', error: error.message });
    }
});

// DELETE user (id)
router.delete('/api/users/:id', async(req, res) => {
    try {
        var user = await User.findOneAndDelete({_id:req.params.id});
    res.status(200).send(user);
    } catch {
        res.status(500).send({ message: 'Error in DELETE /users/id', error: error.message });
    }
});

module.exports = router;