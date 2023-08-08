const express = require("express");
const app = express();
const PORT = 4000;
const authenticateRouter = require("./server/routes/login")
const dotenv = require("dotenv");
const {auth} = require("express-openid-connect")

dotenv.config()

const {
    AUTH0_SECRET,
    AUTH0_CLIENT_ID,
    AUTH0_ISSUER_BASE_URL,
    BASE_URL
  } = process.env
  
  const config = {
    authRequired: true,
    auth0Logout: true,
    secret: AUTH0_SECRET,
    baseURL: BASE_URL,
    clientID: AUTH0_CLIENT_ID,
    issuerBaseURL: AUTH0_ISSUER_BASE_URL
  };

app.set("json spaces", 2)
//app.use(auth(config));
app.use("/trackr",authenticateRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})