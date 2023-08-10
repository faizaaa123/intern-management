const mongoose = require("mongoose");
const dotenv = require("dotenv");
const requests = require("./requestSeed.json");
//Load env vars
dotenv.config({ path: "./config/.env" });

//Load models
const LeaveRequest = require("./server/models/leaveRequestModel");

//Connect to DB
mongoose.connect(process.env.Mongo_TEST_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Import into DB
const importRequestData = async () => {
  try {
    await LeaveRequest.create(requests);

    console.log(`Data Imported....`);
    mongoose.connection.close();

    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//Delete data

const deleteRequestData = async () => {
  try {
    await LeaveRequest.deleteMany();
    console.log(`Data Destroyed....`);
    // process.exit();
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importRequestData();
} else if (process.argv[2] === "-d") {
  deleteRequestData();
}

module.exports = {
  importRequestData,
  deleteRequestData,
};
