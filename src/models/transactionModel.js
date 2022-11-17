const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto');
const { BadRequestError } = require('../middlewares/customError');

const transaction = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    project: { type: Schema.Types.ObjectId, default: null, ref: "Project" },
    amount: { type: Number, required: true },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Completed', 'Failed'] },
    ref: {
        type: String, default: () => {
            return crypto.randomUUID()
        }
    },
    receipt: { type: Schema.Types.ObjectId, ref: 'RideReceipt', require: true }
}, { timestamps: true })

transaction.pre('save', function (next) {
    if (this.project === null) { throw new mongoose.MongooseError("Project is required ") }
    next()
})

const Transaction = mongoose.model('Transaction', transaction)

module.exports = {
    Transaction
}