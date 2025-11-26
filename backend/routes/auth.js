const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName, role } = req.body;
    
    console.log('📝 Register request:', { email, fullName, role }); // DEBUG LOG
    
    // Validate input
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Validate role
    if (!role || !['admin', 'faculty', 'student'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Must be admin, faculty, or student' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with EXPLICIT role
    const user = new User({
      email,
      password: hashedPassword,
      fullName,
      role: role // EXPLICIT role assignment
    });

    await user.save();
    
    console.log('✅ User created:', { id: user._id, email: user.email, role: user.role }); // DEBUG LOG
    
    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return response with role
    res.status(201).json({ 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        fullName: user.fullName, 
        role: user.role // Make sure role is returned
      } 
    });
  } catch (error) {
    console.error('❌ Register error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('🔐 Login request:', { email }); // DEBUG LOG
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    console.log('✅ Login successful:', { id: user._id, email: user.email, role: user.role }); // DEBUG LOG

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return response with role
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        fullName: user.fullName, 
        role: user.role // Make sure role is returned
      } 
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get Current User Route
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
