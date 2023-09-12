const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/api/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
});

module.exports = router;