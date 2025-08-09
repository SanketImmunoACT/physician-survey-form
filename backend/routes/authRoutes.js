const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Assuming jsonwebtoken for JWT
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Assuming JWT_SECRET and protect middleware are defined in index.js and passed or imported
// For now, I'll define them here for self-containment, but ideally, they'd be shared.
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

// Middleware to protect routes (copied from index.js for now, will need to be refactored for sharing)
const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};


// Register Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const tempPassword = password || Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'SALESPERSON',
        status: 'PENDING',
      },
    });

    return res.status(201).json({ message: 'Request submitted successfully. Please wait for admin approval.' });
  } catch (error) {
    if (error.code === 'P2002') { // Prisma unique constraint error
      return res.status(409).json({ error: 'Email already exists' });
    }
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.role === 'SALESPERSON' && user.status !== 'ACTIVE') {
      return res.status(403).json({ error: 'Your account is pending approval.' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax', // Changed from 'strict' to 'Lax' to match index.js
      maxAge: 3600000, // 1 hour in milliseconds
      path: '/',
    }).json({
      message: 'Login successful',
      role: user.role,
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax', // Changed from 'strict' to 'Lax' to match index.js
      expires: new Date(0), // Expire the cookie immediately
      path: '/',
    }).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get User (Me) Route
router.get('/me', protect, async (req, res) => {
  try {
    // req.user is set by the protect middleware
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId }, // Use userId from JWT payload
      select: { id: true, name: true, email: true, role: true, status: true }, // Include role and status
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (err) {
    console.error('Fetch user (me) error:', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;