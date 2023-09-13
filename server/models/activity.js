var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
mongoose.connect('mongodb://127.0.0.1:27017/animalDevelopmentDB',
    { useNewUrlParser: true });
*/

var activitySchema = new Schema({
    name: { type: String },
    is_visited: { type: Boolean },
    is_on_bucketlist: { type: Boolean },
    reviews: {  type: mongoose.Schema.Types.ObjectId, ref: 'review'},
    journals: {  type: mongoose.Schema.Types.ObjectId, ref: 'journal'},
    users:{  type: mongoose.Schema.Types.ObjectId, ref: 'user'}
});
module.exports = mongoose.model('activities', activitySchema);

