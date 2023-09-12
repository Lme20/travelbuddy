var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: { type: String },
    gpsLocation: { type: String }, // type?
    prefCurrency: { type: String },
    prefUnit: { type: String },
    checklists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'checklist' }],
    locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'location' }],
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'activity' }],
    journals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'journal' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'review' }]
});

module.exports = mongoose.model('users', userSchema);

