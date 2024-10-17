const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    image: Buffer,
    name: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String,
});

module.exports = mongoose.model("product", productSchema);
