const express = require('express');
const router = express.Router();
const Checklist = require('../models/checklist');

router.post('/checklists', async (req, res) => {
    const checklist = new Checklist(req.body);
    await checklist.save();
    res.status(201).send(checklist);
});

module.exports = router;
