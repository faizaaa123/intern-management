const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: [true, "Please add a name"],
  },
  role: {
    type: String,
    enum: ["intern", "supervisor"],
    required: [true, "Please add a role"],
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  internRole: {
    type: String, // Enum: 'project manager', 'software engineer', etc.
    required: function () {
      return this.role === "intern"; // Only required for interns
    },
  },
  last_checkin: {
    type: Date,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
