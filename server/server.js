const mongoose = require("mongoose");
const express = require("express");
const internRouter = require("./routes/internRoute");
const requestRouter = require("./routes/requestRoute");
const User = require("./models/userModel");
const LeaveRequest = require("./models/leaveRequestModel");

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

const internAccess = (req, res, next) => {
  if (req.user && req.user.role === "intern") {
    // User is an intern, grant access
    next();
  } else {
    res.status(403).json({ message: "Access denied." });
  }
};

const supervisorAccess = (req, res, next) => {
  if (req.user && req.user.role === "supervisor") {
    // User is a supervisor, grant access
    res.status | (200).json({ message: "supervisor granted" });
    next();
  } else {
    res.status(403).json({ message: "Access denied." });
  }
};
app.use("/api/v1/interns", internRouter);
app.use("/api/v1/requests", requestRouter);

//creating get requests associated with a user
app.get("/api/v1/:id/requests", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorResponse(`User not found with an id of ${req.params.id}`, 404)
    );
  }
  const requests = await LeaveRequest.find({ user: user._id });
  res.status(200).json({ success: true, data: requests });
});
app.use(errorHandler);
mongoose
  .connect(process.env.Mongo_DB_URI, {
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
