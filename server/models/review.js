const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({  
    stars: { type: Number},
    text: { type: String},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('Review', reviewSchema);

