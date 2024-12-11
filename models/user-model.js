const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    }],
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: "product"
    }],
    picture: Buffer,
});

module.exports = mongoose.model("user", userSchema);