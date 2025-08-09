const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Assuming JWT_SECRET and protect middleware are defined in index.js and passed or imported
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

// POST /api/hospitals - Create a new hospital request
router.post('/', protect, async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId; // From JWT payload

    await prisma.hospital.create({
      data: {
        name,
        requestedBy: userId.toString(), // Ensure it's a string if your schema expects it
      },
    });

    return res.status(201).json({ message: 'Hospital request submitted successfully' });
  } catch (err) {
    if (err.code === 'P2002') { // Prisma unique constraint error
      return res.status(409).json({ error: 'Hospital already exists' });
    }
    console.error('Hospital creation error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// GET /api/hospitals - Get all hospitals
router.get('/', protect, async (req, res) => {
  try {
    const hospitals = await prisma.hospital.findMany();
    return res.json(hospitals);
  } catch (err) {
    console.error('Fetch hospitals error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;