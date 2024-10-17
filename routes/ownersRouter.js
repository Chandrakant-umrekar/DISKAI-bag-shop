const { log } = require("debug/src/node");
const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const productModel = require("../models/product-model")

if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res.status(500).send("you don't have permision to create a owner.")
        }
        let { fullname, email, password } = req.body;

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.status(201).send(createdOwner);
    });
}

router.get("/admin", async (req, res) => {
    const success = req.flash("success");
    const products = await productModel.find();
    res.render("admin", { success, products });
});

router.get("/createproduct", (req, res) => {
    const error = req.flash("error");
    res.render("createProduct", { error })
});

module.exports = router;