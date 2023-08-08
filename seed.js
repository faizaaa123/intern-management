const mongoose = require("mongoose");
const dotenv = require("dotenv");
const interns = require("./seed.json");
//Load env vars
dotenv.config({ path: "./config/.env" });

//Load models
const User = require("./server/models/userModel");

//Connect to DB
mongoose.connect(process.env.Mongo_TEST_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Import into DB
const importData = async () => {
  try {
    await User.create(interns);

    console.log(`Data Imported....`);
    mongoose.connection.close();

    process.exit();
  } catch (err) {
    console.error(err);
  }
};

//Delete data

const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log(`Data Destroyed....`);
    // process.exit();
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
