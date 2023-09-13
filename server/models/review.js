const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({  
    stars: { type: Number},
    text: { type: String},
    userId: { //can be consider as 'author'
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    activities: { type: mongoose.Schema.Types.ObjectId, ref: 'activity'}
});

module.exports = mongoose.model('Review', reviewSchema);

