const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const project = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    funds: {
        type: new Schema({
            target_amount: {
                type: Number,
                required: true
            },
            raised_amount: {
                type: Number,
                default: 0
            }
        }),
        required: true
    },
    image: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    donors: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    donations: [{
        type: Schema.Types.ObjectId,
        ref: 'Donation',
        default: []
    }],
    status: {
        type: String,
        enum: ['Pending', 'Active', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamp: true })

const Project = mongoose.model("Project", project)

module.exports = {
    Project
}
