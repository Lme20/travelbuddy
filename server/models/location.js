const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({

    name: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    // other attributes here
});

module.exports = mongoose.model('Location', locationSchema);

