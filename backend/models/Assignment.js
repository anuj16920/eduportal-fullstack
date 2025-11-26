const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  deadline: {
    type: Date,
    required: true
  },
  totalMarks: {
    type: Number,
    default: 100
  },
  submissions: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    studentName: String,
    submittedAt: {
      type: Date,
      default: Date.now
    },
    grade: {
      type: Number,
      default: null
    },
    feedback: {
      type: String,
      default: ''
    },
    fileUrl: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  }],
  status: {
    type: String,
    enum: ['ongoing', 'completed'],
    default: 'ongoing'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Assignment', assignmentSchema);
