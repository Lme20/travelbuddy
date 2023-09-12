const express = require('express');
const router = express.Router();
const Location = require('./Location');

// POST Create Location
router.post('/locations', async (req, res) => {
    const location = new Location(req.body);
    await location.save();
    res.status(201).send(location);
});

// Other CRUD operations here

module.exports = router;
