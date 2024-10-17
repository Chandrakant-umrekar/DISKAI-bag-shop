const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");
const config = require("config")

const debug = require("debug")("development:mongoose")

mongoose.connect(`${config.get("MONGODB_URI")}/diskai`)//getting this form development.json
    .then(() => {
        debug("connected to mongoDB");
    })
    .catch((err) => {
        debug("failed to connect mongoDB:", err);
    })

module.exports = mongoose.connection;