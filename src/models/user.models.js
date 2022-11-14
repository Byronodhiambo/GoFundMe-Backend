const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Password = require("./password.models");

const accountStatus = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: "User"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    }
});

const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: [
            "EndUser", 'Admin', "SuperAdmin", "ProjectOwner"]
    },
    account_status: {
        type: schema.Types.ObjectId,
        ref: "AccountStatus"
    },

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
const AccountStatus = mongoose.model("AccountStatus", accountStatus);

userSchema.pre("save", async function (next) {
    try {
        const data = {
            user: this._id,
            password: this.password
        };

        const password = await Password.create(data);
        this.password = password._id;

        const status = await AccountStatus.create({ user: this._id });
        this.account_status = status._id;

        next();
    } catch (error) {

    }
})



module.exports = User;
