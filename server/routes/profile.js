const express = require("express");
const router =  express.Router();


//ideally, we want to fetch data from the database - this is simply for testing purposes :)
let data = {
    "applepieshortbread5@outlook.com":["hello", "hi", "nice to meet you!", "see you later"],
    "strawberrycrumble@gmail.com": ["funny", "enthusiastic", "skydiving", "crippling anxiety"]}

const getProfile = async(req, res) => {
    try {
        const email = req.user;
        // console.log(email)
        //sends data for specific email
        res.status(200).send(data[email]);
    } catch (error) {
        res.status(500).send("unable to fetch profile.", error)
    }
}

router.get("/", getProfile)

module.exports = router