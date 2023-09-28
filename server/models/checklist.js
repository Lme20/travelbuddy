var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var checklistSchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' , required: true },
    //type: { type: String }, // packing, bucketlist, cost_list
    // title: { type: String, required: true },
    // location: { type: mongoose.Schema.Types.ObjectId, ref: 'location', required: true },
    items: [{ type: String }],
    costItems: [ { item: {type: String}, cost: {type: Number} } ],
    totalCost: { type : Number }
});

module.exports = mongoose.model('checklists', checklistSchema);

// TODO this does not work.
checklistSchema.pre('save', function(next) {
    if (this.costItems != null) {
        module.exports.aggregate(
            this.totalCost = { $sum: "$cost" }
        );
        console.log("did it");
    }
    next()
})
