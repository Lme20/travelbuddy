const express = require('express');
const router = express.Router();
const Checklist = require('../models/checklist');

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

module.exports = router;
