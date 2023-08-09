const express = require("express");
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const User = require("../../db/userModel");


async function checkExistingUser(user) {
    const firstName = user.given_name;
    const response = await User.findOne({where: {firstName: given_name}});
    console.log(response)
    return response;
}

//getting main page and logging user's details into database
router.get("/", async (req, res) => {
    res.json(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')

    if(req.oidc.isAuthenticated()) {

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(req.oidc.user),
        }
        try {
            const response = await fetch("http://localhost:5005/users", options)
            const data = await response.json()
            console.log(data);
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