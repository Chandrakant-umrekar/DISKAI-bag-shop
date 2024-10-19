const { log } = require("debug/src/node");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const ownerModel = require("../models/owner-model");
const productModel = require("../models/product-model")
const { generateToken } = require("../utils/generateToken");
const isOwnerLoggedIn = require("../middlewares/isOwnerLoggedIn");

if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        let owners = await ownerModel.find();
        if (owners.length > 1) {
            return res.status(500).send("you don't have permision to create a owner.")
        }

        let { fullname, email, password } = req.body;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                else {
                    await ownerModel.create({
                        fullname,
                        email,
                        password: hash,
                    });
                    res.status(201).send("owner created");
                }
            })
        });
    });
}

router.get("/login", (req, res) => {
    let error = req.flash("error");
    res.render("owner-login", { error });
})

router.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        let owner = await ownerModel.findOne({ email });
        if (!owner) {
            req.flash("error", "Email or Password is incorrect");
            return res.status(401).redirect("/owners/login");
        }

        bcrypt.compare(password, owner.password, (err, result) => {
            if (result) {
                let token = generateToken(owner);
                res.cookie("ownerToken", token);
                res.redirect("/owners/admin");
            } else if (err) {
                req.flash("error", "Email or Password is incorrect");
                res.status(401).redirect("/owners/login");
            }
        });
    } catch (err) {
        return res.status(500).send("Internal error: something went wrong");
    }
})

router.get("/admin", isOwnerLoggedIn, async (req, res) => {
    const success = req.flash("success");
    const products = await productModel.find();
    res.render("admin", { success, products });
});

router.get("/createproduct", isOwnerLoggedIn, (req, res) => {
    const error = req.flash("error");
    res.render("createProduct", { error })
});

module.exports = router;