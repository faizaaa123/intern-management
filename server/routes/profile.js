const express = require("express");
const router =  express.Router();


//ideally, we want to fetch data from the database - this is simply for testing purposes :)
let data = ["hello", "hi", "nice to meet you!", "see you later"]

const getProfile = async(req, res) => {
    try {
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send("unable to fetch profile.", error)
    }
}

router.get("/", getProfile)

module.exports = router