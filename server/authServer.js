const express = require("express")
const { requiresAuth, auth } = require('express-openid-connect');
const loginRouter = require("./routes/login");
const axios = require("axios")
require('dotenv').config();
const app = express();
const cors = require("cors")
app.use(cors({
  origin: "http://localhost:3000"
}))

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000",);
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

const {
    AUTH0_SECRET,
    AUTH0_CLIENT_ID,
    AUTH0_ISSUER_BASE_URL,
    AUTH0_BASE_URL,
    AUTH0_CLIENT_SECRET
  } = process.env
  
  const config = {
    authRequired: true,
    auth0Logout: true,
    secret: AUTH0_SECRET,
    baseURL: AUTH0_BASE_URL,
    clientID: AUTH0_CLIENT_ID,
    issuerBaseURL: AUTH0_ISSUER_BASE_URL,
    clientSecret: AUTH0_CLIENT_SECRET,
    // routes: {
    //   callback: '/auth/callback',
    //   login: '/auth/login',
    // },
  //   authorizationParams: {
  //     response_type: 'code', // This requires you to provide a client secret
  //     audience: 'https://api.example.com/products',
  //     scope: 'openid profile email read:products',
  // }
}
  
  app.use(auth(config));
  app.use("/", loginRouter);

  // app.get("/", (req, res) => {
  //   res.send("welcome to localhost:4000")
  // })

  app.listen(4000, ()=> {
    console.log("Auth0 server is running on port http://localhost:4000");
  })