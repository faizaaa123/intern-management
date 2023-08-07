const express = require("express");
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

//getting main page
router.get("/", (req, res) => {
    res.json(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})


//getting user session info
router.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

//can also do http://localhost:3001/logout to logout of app

module.exports = router