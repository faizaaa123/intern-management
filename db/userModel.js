const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['intern', 'supervisor'],
    required: true
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  internRole: {
    type: String, //'project manager', 'software engineer'
    required: function() {
      return this.role === 'intern'; // Only required for interns
    }
  },
  checkedIn: {
      type: String,
      enum: ["checkedIn", "wfh","onLeave"],
      required: function(){
        return this.role === "intern"
      }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
