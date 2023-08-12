const express = require("express");
const app = express();
const PORT = 5000;
const dotenv = require("dotenv");
const cors = require('cors')

const profile = require("./routes/profile");
const authenticate = require("./routes/authenticate");
app.use(cors())

dotenv.config()

app.use("/profile",authenticate, profile)

app.listen(
    PORT,
    console.log(`Server is listening at port http://localhost:${PORT}`)
  );