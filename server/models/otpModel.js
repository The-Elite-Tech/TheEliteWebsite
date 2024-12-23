const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    id: {
        type: String,
        required: [true, "Please add id"],
    },
    email: {
        type: String,
        required: [true, "Please add domain"],
        unique: [true, "Email already registered"]
    },
    otp: {
        type: String,
        required: [true, "Please add otp"],
    },
    expirationTime: { type: Date, required: true, expires: 0 } // TTL index
},{
    timestamps: true,
});

module.exports = mongoose.model("usersOTP", userSchema);