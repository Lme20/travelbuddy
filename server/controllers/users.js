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

module.exports = router;