var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var journalSchema = new Schema({
    title: { type: String },
    mainBodyText: { type: String },
    date: { type: Date }
});

module.exports = mongoose.model('journals', journalSchema);

