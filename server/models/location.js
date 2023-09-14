const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    LocationID: { type: Number}, //Might be changed later
    place_name: { type: String}, //Should be changed based on Google's API
    is_visited: { type: Boolean },
    optional_review: { type: String},
    is_on_bucketlist: { type: Boolean },
    distance_to_locations: { type: Number},
    checklists: [{type: mongoose.Schema.Types.ObjectId, ref: 'checklist'}], // Refencing to checklist model
    activities: [{type: mongoose.Schema.Types.ObjectId, ref: 'activity'}], // Referencing to activity model
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'review'}], // Referencing to review model
    journals: {  type: mongoose.Schema.Types.ObjectId, ref: 'journal'}

});

module.exports = mongoose.model('locations', locationSchema);

