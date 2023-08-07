const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json("logged in.")
})

module.exports = router