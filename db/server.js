const mongoose = require("mongoose");
const User = require("./userModel"); 
const LeaveRequest = require("./leaveRequestModel"); 
const express = require("express");
const app = express();
const { requiresAuth } = require('express-openid-connect');
require('dotenv').config();
const cors = require('cors');

app.use(express.json());
app.use(cors());

//TODO: when a user is authenticated using auth0, they are added to the database
//TODO: an authenticated user can GET their own profile from the database
//TODO: an authenticated user can PUT (update) their own profile from the database

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/users', async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const {given_name, family_name} = req.body;
    const newUser = await User.create({
      firstname: given_name, 
      lastname: family_name, 
      email: "applecrumble@outlook.com", 
      password: "hashedpassword4", 
      role: "intern",
      checkedIn: "checkedIn",
      internRole: "Product Management"
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user.', error , data});
  }
});

app.get('/users', async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error)
  }
})

app.post('/user', async (req, res) => {
  try {
    const response = await fetch("http://localhost:3001/profile")
    const {given_name, family_name} = response
    // const newUser = await User.create({firstname: given_name, lastname: family_name, email: "applecrumble@outlook.com", password: "12345"});
    console.log(response);
    res.statusCode(200).send(response)
  } catch (error) {
    
  }
})

mongoose.connect(process.env.Mongo_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(5005, () => {
    console.log("App is running on http://localhost:5005");
  });
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.log(error);
});

module.exports = app;
