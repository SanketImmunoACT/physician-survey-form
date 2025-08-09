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

// POST /api/physicians - Create a new physician request
router.post('/', protect, async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId; // From JWT payload

    await prisma.physician.create({
      data: {
        name,
        requestedBy: userId.toString(), // Ensure it's a string if your schema expects it
      },
    });

    return res.status(201).json({ message: 'Physician request submitted successfully' });
  } catch (err) {
    if (err.code === 'P2002') { // Prisma unique constraint error
      return res.status(409).json({ error: 'Physician already exists' });
    }
    console.error('Physician creation error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/physicians - Get all physicians
router.get('/', protect, async (req, res) => {
  try {
    const physicians = await prisma.physician.findMany();
    return res.json(physicians);
  } catch (err) {
    console.error('Fetch physicians error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;