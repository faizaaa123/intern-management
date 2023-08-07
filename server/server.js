const express = require("express");
const app = express();
const PORT = 3001;
const dotenv = require("dotenv");
const {auth} = require("express-openid-connect");


const internRouter = require("./routes/internRoute");
const loginRouter = require("./routes/login");

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

app.use(express.json());
app.use(express.urlencoded());

//Mount routers
app.use("/api/v1/interns", internRouter);

//login aunthentication
app.use(auth(config));
app.use("/", loginRouter);

app.listen(
  PORT,
  console.log(`Server is listening at port http://localhost:${PORT}`)
);
