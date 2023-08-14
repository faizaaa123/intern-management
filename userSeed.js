const mongoose = require("mongoose");
const dotenv = require("dotenv");
const interns = require("./userSeed.json");
//Load env vars
dotenv.config({ path: "./config/.env" });

//Load models
const User = require("./server/models/userModel");

//Connect to DB
mongoose.connect(process.env.Mongo_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Import into DB
const importUserData = async () => {
  try {
    await User.create(interns);

    console.log(`Data Imported....`);
    mongoose.connection.close();

    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//Delete data

const deleteUserData = async () => {
  try {
    await User.deleteMany();
    console.log(`Data Destroyed....`);
    // process.exit();
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importUserData();
} else if (process.argv[2] === "-d") {
  deleteUserData();
}

module.exports = {
  importUserData,
  deleteUserData,
};
