const express = require('express');
const router = express.Router();
const Checklist = require('../models/checklist');
const User = require('../models/user');

router.post('/api/checklists', async (req, res) => {
    const checklist = new Checklist(req.body);
    await checklist.save();
    res.status(201).send(checklist);
});

router.post('/api/users/:id/checklists', async (req, res) => {
    var id = req.params.id;
    var checklist = new Checklist(req.body);

    User.findById(id).then( async(user, userres) => {
        if (user == null) {
            return userres.status(404).json({"message": "Owner not found"});
        }
        await user.save();
        checklist.owner = user;
        await checklist.save();
        res.status(201).send(checklist);
    });
    
});

module.exports = router;
