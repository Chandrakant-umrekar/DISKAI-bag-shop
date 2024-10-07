const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello i'm user")
});

module.exports = router;