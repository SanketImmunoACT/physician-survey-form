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

// Middleware to check for SUPERADMIN role
const superadminOnly = (req, res, next) => {
  if (req.user.role !== 'SUPERADMIN') {
    return res.status(403).json({ message: 'Forbidden: SUPERADMIN role required' });
  }
  next();
};

// Approve hospital (Admin only)
router.put('/:hospitalId/approve', protect, superadminOnly, async (req, res) => {
  try {
    const { hospitalId } = req.params;

    await prisma.hospital.update({
      where: { id: parseInt(hospitalId) },
      data: { status: 'ACTIVE' },
    });

    return res.json({ message: 'Hospital approved successfully' });
  } catch (err) {
    console.error('Error approving hospital:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;