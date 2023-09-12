var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: { type: String },
    name: { type: String },
    gpsLocation: { type: String },
    prefCurrency: { type: String },
    prefUnit: { type: String },
    checklists: [],
    locations: [],
    activities: [],
    journals: [],
    reviews: []
});

module.exports = mongoose.model('users', userSchema);

