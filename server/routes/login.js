const express = require("express");
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
// const User = require("../../db/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const axios = require("axios")

require("dotenv").config()

const {
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_DOMAIN
} = process.env


// async function checkExistingUser(user) {
//     const firstName = user.given_name;
//     const response = await User.findOne({where: {firstName: given_name}});
//     console.log(response)
//     return response;
// }

//getting main page and logging user's details into database

router.get("/auth/login", async (req, res) => {

    res.json({
        authenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
    })
})

// router.get("/", async (req, res) => {

//     res.json({
//        message: "Hi there it works!"
//     })
// })


var options = {
    method: 'POST',
    url: `https://${AUTH0_DOMAIN}/oauth/token`,
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      audience: `https://${AUTH0_DOMAIN}/api/v2/`
    })
  };

// router.get("/", async (req, res) => {
//     res.json(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')

//     if(!req.oidc.isAuthenticated()) {

//         res.status(500).json({message: "Login failed."})

//     } else {

//         const options = {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify(req.oidc.user),
//         }
//         try {
//             const response = await fetch("http://localhost:5005/users", options)
//             const idToken = req.oidc.idToken
//             //const verifiedToken = jwt.verify(idToken, AUTH0_CLIENT_SECRET, {alorgithms: ['RS256']})
//             const data = await response.json()
//             console.log(data, "idToken: ", idToken,);
//         } catch (error) {
//             console.log(error);
//         }
        
//     }
// })




//getting user session info
router.get('/auth/profile', requiresAuth(), async (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

//can also do http://localhost:3001/logout to logout of app


//   axios.request(options).then(function (response) {
//     console.log(response.data);
//   }).catch(function (error) {
//     console.error(error);
//   });

module.exports = router