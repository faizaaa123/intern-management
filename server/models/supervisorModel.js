const mongoose = require("mongoose");

const supervisorSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please add a firstname"],
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  lastname: {
    type: String,
    required: [true, "Please add a lastname"],
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
    unique: true,
  },
  interns: [],
});

const Supervisor = mongoose.model("Supervisor", supervisorSchema);

module.exports = Supervisor;
