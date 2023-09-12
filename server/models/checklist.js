var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var checklistSchema = new Schema({
    _id: { type: String },
    owner: { type: String },
    type: { type: String }, // packing, bucketlist, cost_list
    totalCost: { type: Int },
    items: [{ type: String }]
});

module.exports = mongoose.model('checklists', checklistSchema);

