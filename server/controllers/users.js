const express = require('express');
const router = express.Router();
const User = require('../models/user');

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

module.exports = router;