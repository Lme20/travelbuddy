const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({  
    stars: { type: Number},
    text: { type: String},
    userId: { //can be considered as 'author'
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    activities: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}
});

module.exports = mongoose.model('Review', reviewSchema);

