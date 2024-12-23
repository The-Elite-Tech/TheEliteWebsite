const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please add first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please add last name"],
    },
    email: {
        type: String,
        required: [true, "Please add domain"],
        unique: [true, "Email already registered"]
    },
    countryCode: {
        type: String,
        required: [true, "Please add countryCode"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Please add phoneNumber"],
    },
    address: {
        type: String,
        required: [true, "Please add address"],
    },
    city: {
        type: String,
        required: [true, "Please add city"],
    },
    state: {
        type: String,
        required: [true, "Please add state"],
    },
    country: {
        type: String,
        required: [true, "Please add country"],
    },
    password: {
        type: String,
        required: [true, "Please add password"],
    },
    plan: {
        type: String,
        default: 'none',
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("users", userSchema);