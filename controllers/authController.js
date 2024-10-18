const { validateUser } = require("../validators/userValidator")
const userModel = require("../models/user-model")
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken")



module.exports.registerUser = async (req, res) => {
    let { error } = validateUser(req.body);

    if (error) {
        req.flash("error", error.details.map((err) => err.message).join(", "));
        return res.redirect("/")
    }

    try {
        let { email, password, fullname } = req.body;

        let user = await userModel.findOne({ email });
        if (user) {
            req.flash("error", "You already have an account, please login.");
            return res.status(401).redirect("/");
        }


        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname,
                    });
                    let token = generateToken(user)
                    res.cookie("token", token);
                    res.redirect("/shop");
                }
            })
        });

    } catch (err) {
        req.flash("error", "something went wrong");
    }
}

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await userModel.findOne({ email });
        if (!user) {
            req.flash("error", "Email or password is incorrect")
            return res.status(401).redirect("/");
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token);
                res.redirect("/shop");
            } else {
                req.flash("error", "Email or password is incorrect");
                return res.status(401).redirect("/")
            }
        });
    } catch (err) {
        res.status(500)
        req.flash("error", "something went wrong")
    }

}

module.exports.logoutUser = async (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
}

module.exports.addToCart = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        user.cart.push(req.params.productId);
        await user.save();
        req.flash("success", "Product added to Cart");
        res.redirect("/shop")
    } catch (err) {
        return res.status(500).send("Internal error: something went wrong");
    }
}

module.exports.removeFromCart = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        let productIndex = user.cart.findIndex(item => item._id.toString() === req.params.productId);
        if (productIndex !== -1) {
            user.cart.splice(productIndex, 1);
        } else {
            req.flash("success", "product not found in cart");
            return res.status(404).redirect("/users/cart");
        }
        await user.save();
        res.redirect("/users/cart");
    } catch (err) {
        return res.status(500).send("internal error: something went wrong");
    }
}