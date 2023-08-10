const mongoose = require("mongoose");
const express = require("express");
const internRouter = require("./routes/internRoute");
const requestRouter = require("./routes/requestRoute");

const errorHandler = require("./middleware/error");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// app.use(logger);

app.use("/api/v1/interns", internRouter);
app.use("/api/v1/requests", requestRouter);

app.use(errorHandler);
mongoose
  .connect(process.env.Mongo_TEST_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5005, () => {
      console.log("Server App is running on port http://localhost:5005");
    });
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
