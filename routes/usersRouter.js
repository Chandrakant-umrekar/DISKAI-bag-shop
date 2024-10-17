const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require("../controllers/authController")
const isLoggedIn = require("../middlewares/isLoggedIn");
const userModel = require("../models/user-model");

router.get("/cart", isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email }).populate("cart");// to show products dynamically (this are id's)
    const products = user.cart;
    const success = req.flash("success")
    res.render("cart", { products, success })
});


router.post("/addtocart/:productId", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productId);
    await user.save();
    req.flash("success", "Product added to Cart");
    res.redirect("/shop")
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser)

module.exports = router;