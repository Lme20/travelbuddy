var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
    name: { type: String },
    is_visited: { type: Boolean },
    is_on_bucketlist: { type: Boolean },
    review: { type: String}
});

module.exports = mongoose.model('activities', activitySchema);

