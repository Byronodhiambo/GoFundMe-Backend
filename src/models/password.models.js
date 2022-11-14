const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const password = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        password: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamp: true }
);

password.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 8);
    user.password = hash;
    next();
});

const Password = mongoose.model('Password', password);

module.exports = Password;
