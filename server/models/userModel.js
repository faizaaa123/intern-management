const mongoose = require("mongoose");
const Schema = require("seed/lib/seed/schema");
const slugify = require("slugify");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please add a firstname"],
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  password:{
    type:String,
    required: true
  },
  // slug: String,
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
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supervisor",
  },
  internRole: {
    type: String, // Enum: 'project manager', 'software engineer', etc.
    enum: ["project manager", "software engineer"],
  },
  last_checkin: {
    type: Date,
  },
  leaveRequests: [],
});

//Create user slug from schema

// userSchema.pre("save", function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
