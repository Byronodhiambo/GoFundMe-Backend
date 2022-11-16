const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donation = new Schema({
    amount: {
        type: Number,
        required: true
    },
    donor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamp: true })

const Donation = mongoose.model("Donation", donation)

module.exports = {
    Donation
}
