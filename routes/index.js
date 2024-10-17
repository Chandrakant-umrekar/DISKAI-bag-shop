const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn")
const productModel = require("../models/product-model")

router.get("/", (req, res) => {
    const error = req.flash("error") || '';
    res.render("index", { error })
});

router.get("/shop", isLoggedIn, async (req, res) => {
    const products = await productModel.find();
    const success = req.flash("success");
    res.render("shop", { products, success });
});

module.exports = router;