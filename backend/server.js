const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/faculty', require('./routes/faculty'));
app.use('/api/students', require('./routes/students')); // ✅ STUDENTS ROUTE ADDED

// Test Route
app.get('/', (req, res) => {
  res.json({ 
    message: '✅ Education Portal Backend is Running!',
    database: 'MongoDB Connected',
    status: 'Active',
    routes: {
      auth: '/api/auth/register, /api/auth/login',
      faculty: '/api/faculty (GET, POST, PUT, DELETE)',
      students: '/api/students (GET, POST, PUT, DELETE)' // ✅ ADDED
    }
  });
});

// Test Database Connection Route
app.get('/api/test-db', async (req, res) => {
  try {
    const User = require('./models/User');
    const count = await User.countDocuments();
    res.json({ 
      message: 'Database connected successfully!',
      usersCount: count 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Database error',
      error: error.message 
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🔐 Auth routes: http://localhost:${PORT}/api/auth`);
  console.log(`👨‍🏫 Faculty routes: http://localhost:${PORT}/api/faculty`);
  console.log(`🎓 Student routes: http://localhost:${PORT}/api/students`); // ✅ ADDED
});
