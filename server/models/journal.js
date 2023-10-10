var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
mongoose.connect('mongodb://127.0.0.1:27017/animalDevelopmentDB',
    { useNewUrlParser: true });
*/

var journalSchema = new Schema({
    title: { type: String },
    journalTextEntry: { type: String },
    date: { type: Date },
    activities: {  type: mongoose.Schema.Types.ObjectId, ref: 'Activity'},
    locations: {  type: mongoose.Schema.Types.ObjectId, ref: 'Location'}

});

module.exports = mongoose.model('Journal', journalSchema);

