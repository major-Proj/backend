const mongoose = require('mongoose')

//User
const userSchema = new mongoose.Schema({
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    role: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true
    },
    phone_number: {
      type: String
    },
    created_at: {
      type: Date,
      default: Date.now
    }
});

const otpSchema = new mongoose.Schema({
    email: {
      type: String
    },
    otp: {
      type: String,
      required:true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  });

// Define Project Schema
const projectSchema = new mongoose.Schema({
  PID: {
    type: String,
    required: true,
    unique: true
  },
  client_name : {
    type:String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const projectModel = mongoose.model('projects', projectSchema);

// Define Feedback Schema
const feedbackSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  PID: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  comments: {
    type: String
  },
  start_period: {
    type: Date,
    required: true
  },
  end_period: {
    type: Date,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const feedbackModel = mongoose.model('feedbacks', feedbackSchema);

// Define Project Assignment Schema
const projectAssignmentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  PID: {
    type: String,
    required: true
  },
  allocation_start: {
    type: Date,
    required: true
  },
  allocation_end: {
    type: Date,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const projectAssignmentModel = mongoose.model('projectAssignments', projectAssignmentSchema);

// Define Timesheet Schema
const timesheetSchema = new mongoose.Schema({
  UID:{
    type: String,
    unique: true,
    required:true
  },
  email: {
    type: String,
    required: true
  },
  PID: {
    type: String
  },
  activity: {
    type: String
  },
  comments:{
    type: String
  },
  start_period: {
    type: Date,
    required: true
  },
  end_period: {
    type: Date,
    required: true
  },
  mon: {
    type: Number,
    required: true
  },
  tue: {
    type: Number,
    required: true
  },
  wed: {
    type: Number,
    required: true
  },
  thur: {
    type: Number,
    required: true
  },
  fri: {
    type: Number,
    required: true
  },
  sat: {
    type: Number,
    required: true
  },
  sun: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  visible:{
    type:Boolean,
    default:true
  }
});

const timesheetModel = mongoose.model('timesheets', timesheetSchema);
const UserModel = new mongoose.model("users", userSchema)
const otpModel = new mongoose.model("temp_otps", otpSchema)

module.exports = {
    UserModel,
    otpModel,
    projectAssignmentModel,
    timesheetModel,
    projectModel,
    feedbackModel
};