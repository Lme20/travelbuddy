var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var checklistSchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    type: { type: String }, // packing, bucketlist, cost_list
    totalCost: { type: Number },
    items: [{ type: String }]
});

module.exports = mongoose.model('checklists', checklistSchema);

