const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'faculty', 'student'],
    required: true,
    default: 'student'
  },
  avatarUrl: {
    type: String,
    default: null
  },
  phone: {              // ✅ ADD THIS
    type: String,
    default: null
  },
  rollNo: {
    type: String,
    sparse: true
  },
  class: {
    type: String,
    default: null
  },
  year: {
    type: String,
    default: null
  },
  gpa: {
    type: Number,
    default: 0
  },
  department: {
    type: String,
    default: null
  },
  subjects: [{
    type: String
  }],
  courses: [{           // ✅ ADD THIS (or use subjects, they're similar)
    type: String
  }],
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
