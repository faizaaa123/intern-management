const express = require("express");
const app = express();
const PORT = 5000;
const dotenv = require("dotenv");
const cors = require('cors')

const profile = require("./routes/profile")
app.use(cors())

dotenv.config()

app.use("/profile", profile)

app.listen(
    PORT,
    console.log(`Server is listening at port http://localhost:${PORT}`)
  );