const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
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

// Get all users (Admin only)
router.get('/', protect, superadminOnly, async (req, res) => {
  try {
    const { status } = req.query; // Access query parameters via req.query

    const users = await prisma.user.findMany({
      where: {
        status: status ? status.toUpperCase() : undefined,
        role: 'SALESPERSON',
      },
      select: { id: true, name: true, email: true, role: true, status: true }, // Select specific fields
    });

    return res.json(users);
  } catch (err) {
    console.error('Fetch admin users error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Approve user (Admin only)
router.put('/:userId/approve', protect, superadminOnly, async (req, res) => {
  try {
    const { userId } = req.params; // Access route parameters via req.params
    const { password } = req.body; // Access request body via req.body

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { status: 'ACTIVE', password: hashedPassword },
    });

    return res.json({ message: 'User approved successfully' });
  } catch (err) {
    console.error('Error approving user:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Deny user (Admin only)
router.delete('/:userId/deny', protect, superadminOnly, async (req, res) => {
  try {
    const { userId } = req.params; // Access route parameters via req.params

    await prisma.user.delete({
      where: { id: parseInt(userId) },
    });

    return res.json({ message: 'User denied successfully' });
  } catch (err) {
    console.error('Error denying user:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;