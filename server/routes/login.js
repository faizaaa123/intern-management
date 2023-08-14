const express = require("express");
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
// const User = require("../../db/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config()

const {
    AUTH0_SECRET,
    AUTH0_CLIENT_SECRET,
    AUTH0_CLIENT_ID,
    AUTH0_ISSUER_BASE_URL,
    BASE_URL
  } = process.env




// async function checkExistingUser(user) {
//     const firstName = user.given_name;
//     const response = await User.findOne({where: {firstName: given_name}});
//     console.log(response)
//     return response;
// }

//getting main page and logging user's details into database
router.get("/", async (req, res) => {
    res.json(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')

    if(!req.oidc.isAuthenticated()) {

        res.status(500).json({message: "Login failed."})

    } else {

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(req.oidc.user),
        }
        try {
            const response = await fetch("http://localhost:5005/users", options)
            const idToken = req.oidc.idToken
            //const verifiedToken = jwt.verify(idToken, AUTH0_CLIENT_SECRET, {alorgithms: ['RS256']})
            const data = await response.json()
            console.log(data, "idToken: ", idToken,);
        } catch (error) {
            console.log(error);
        }
        
    }
})




//getting user session info
router.get('/profile', requiresAuth(), (req, res) => {

    res.send(JSON.stringify(req.oidc.user));
  });

//can also do http://localhost:3001/logout to logout of app



module.exports = router