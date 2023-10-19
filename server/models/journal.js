var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
mongoose.connect('mongodb://127.0.0.1:27017/animalDevelopmentDB',
    { useNewUrlParser: true });
*/

var journalSchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' , required: true },
    title: { type: String, required: true },
    journalTextEntry: { type: String, required: true },
    date: { type: Date },
    locations: {  type: String, ref: 'locations'}
});

module.exports = mongoose.model('Journal', journalSchema);

