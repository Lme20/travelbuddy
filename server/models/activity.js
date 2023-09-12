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
    review: { type: String}
});

module.exports = mongoose.model('activities', activitySchema);

