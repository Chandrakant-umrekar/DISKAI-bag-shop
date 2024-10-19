const jwt = require("jsonwebtoken");
const ownerModel = require("../models/owner-model");

module.exports = async (req, res, next) => {
    if (!req.cookies.ownerToken) {
        req.flash("error", "You need to login");
        return res.redirect("/owners/login")
    }

    try {
        let decoded = jwt.verify(req.cookies.ownerToken, process.env.JWT_KEY);
        let owner = await ownerModel.findOne({ email: decoded.email }).select("-password"); //select -> to remove password 
        req.owner = owner;
        next();
    } catch (err) {
        return res.status(500).send("Internal error: something went wrong");
    }
}