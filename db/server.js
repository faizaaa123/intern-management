const mongoose = require("mongoose");
const User = require("./userModel"); 
const LeaveRequest = require("./leaveRequestModel"); 
const express = require("express");
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user.' });
  }
});

mongoose.connect(process.env.Mongo_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(5005, () => {
    console.log("App is running on port 5005");
  });
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.log(error);
});

module.exports = app;
