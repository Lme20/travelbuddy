var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: { type: String, required: true },
    gpsLocation: { type: String }, // type?
    prefCurrency: { type: String },
    prefUnit: { type: String },
    checklists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Checklist' }],
    locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
    journals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Journal' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('User', userSchema);
