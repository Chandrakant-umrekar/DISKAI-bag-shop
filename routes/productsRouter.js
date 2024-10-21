const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const { isOwnerLoggedIn } = require("../middlewares/isOwnerLoggedIn");
const ownerModel = require("../models/owner-model");

router.post("/createproduct", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            req.flash("error", "image is required");
            return res.status(400).redirect("/owners/createproduct");
        }
        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor: "#" + bgcolor || "#f0f0f0",
            panelcolor: "#" + panelcolor || "#003366",
            textcolor: "#" + textcolor || "#FFFFFF",
        });
        req.flash("success", "Product created successfully!");
        res.redirect("/owners/admin");
    } catch (err) {
        console.error("Error creating product:", err);
        return res.send("Server error: something went wrong").status(500);
    }
});

router.post("/remove/:productId", async (req, res) => {
    try {
        const product = await productModel.findOneAndDelete({ _id: req.params.productId });
        req.flash("success", `${product.name} is removed from shop.`)
        res.redirect("/owners/admin");
    } catch (err) {
        console.error("Error creating product deletion:", err);
        return res.send("Server error: something went wrong").status(500);
    }
})

module.exports = router;
