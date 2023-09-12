const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    
    text: String,
    stars: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // other attributes
});

module.exports = mongoose.model('Review', reviewSchema);

