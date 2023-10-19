const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    placeId: { type: String },  // Google's Place ID, useful for uniquely identifying locations
    placeName: { type: String}, // Should be changed based on Google's API
    placeType: { type: [String] },  // This can be an array of types like ['restaurant', 'bar']
    placeCoordinates: { type: { lat: Number, lng: Number } },
    address: { type: String },
    isVisited: { type: Boolean },
    optionalReview: { type: String},
    isOnBucketlist: { type: Boolean },
    distanceToLocations: { type: Number},
    checklists: [{type: mongoose.Schema.Types.ObjectId, ref: 'Checklist'}], // Refencing to checklist model
    activities: [{type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}], // Referencing to activity model
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}], // Referencing to review model
    journals: {  type: mongoose.Schema.Types.ObjectId, ref: 'Journal'}

});

module.exports = mongoose.model('Location', locationSchema);

