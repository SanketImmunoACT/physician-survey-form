require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Allow requests from your frontend
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// JWT Secret (replace with a strong, random secret in production)
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

// Middleware to protect routes
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

// Import and use auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Import and use admin user routes
const adminUserRoutes = require('./routes/adminUserRoutes');
app.use('/api/admin/users', adminUserRoutes);

// Import and use admin hospital routes
const adminHospitalRoutes = require('./routes/adminHospitalRoutes');
app.use('/api/admin/hospitals', adminHospitalRoutes);

// Import and use admin physician routes
const adminPhysicianRoutes = require('./routes/adminPhysicianRoutes');
app.use('/api/admin/physicians', adminPhysicianRoutes);

// Import and use hospital routes
const hospitalRoutes = require('./routes/hospitalRoutes');
app.use('/api/hospitals', hospitalRoutes);

// Import and use physician routes
const physicianRoutes = require('./routes/physicianRoutes');
app.use('/api/physicians', physicianRoutes);

// --- API Routes (will be populated from Next.js API logic) ---

// Auth Routes












// Admin Routes






// Zonal Manager 1 Routes
const protectZM1 = (req, res, next) => {
  if (req.user.role !== 'ZONAL_MANAGER_1') {
    return res.status(403).json({ message: 'Forbidden: Zonal Manager 1 only' });
  }
  next();
};

app.get('/api/zm1/submissions', protect, protectZM1, async (req, res) => {
  try {
    const submissions = await prisma.surveySubmission.findMany({
      where: {
        zm1_approval_status: 'PENDING',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    res.json(submissions);
  } catch (error) {
    console.error('Fetch ZM1 submissions error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/zm1/submissions/:submissionId/approve', protect, protectZM1, async (req, res) => {
  const { submissionId } = req.params;
  try {
    const submission = await prisma.surveySubmission.update({
      where: { id: parseInt(submissionId) },
      data: {
        zm1_approval_status: 'APPROVED',
        zm1_approver_id: req.user.id,
      },
    });
    res.json({ message: 'Submission approved by Zonal Manager 1', submission });
  } catch (error) {
    console.error('ZM1 approve submission error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/zm1/submissions/:submissionId/reject', protect, protectZM1, async (req, res) => {
  const { submissionId } = req.params;
  try {
    const submission = await prisma.surveySubmission.update({
      where: { id: parseInt(submissionId) },
      data: {
        zm1_approval_status: 'REJECTED',
        zm1_approver_id: req.user.id,
      },
    });
    res.json({ message: 'Submission rejected by Zonal Manager 1', submission });
  } catch (error) {
    console.error('ZM1 reject submission error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Zonal Manager 2 Routes
const protectZM2 = (req, res, next) => {
  if (req.user.role !== 'ZONAL_MANAGER_2') {
    return res.status(403).json({ message: 'Forbidden: Zonal Manager 2 only' });
  }
  next();
};

app.get('/api/zm2/submissions', protect, protectZM2, async (req, res) => {
  try {
    const submissions = await prisma.surveySubmission.findMany({
      where: {
        zm1_approval_status: 'APPROVED',
        zm2_approval_status: 'PENDING',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    res.json(submissions);
  } catch (error) {
    console.error('Fetch ZM2 submissions error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/zm2/submissions/:submissionId/approve', protect, protectZM2, async (req, res) => {
  const { submissionId } = req.params;
  try {
    const submission = await prisma.surveySubmission.update({
      where: { id: parseInt(submissionId) },
      data: {
        zm2_approval_status: 'APPROVED',
        zm2_approver_id: req.user.id,
      },
    });
    res.json({ message: 'Submission approved by Zonal Manager 2', submission });
  } catch (error) {
    console.error('ZM2 approve submission error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/zm2/submissions/:submissionId/reject', protect, protectZM2, async (req, res) => {
  const { submissionId } = req.params;
  try {
    const submission = await prisma.surveySubmission.update({
      where: { id: parseInt(submissionId) },
      data: {
        zm2_approval_status: 'REJECTED',
        zm2_approver_id: req.user.id,
      },
    });
    res.json({ message: 'Submission rejected by Zonal Manager 2', submission });
  } catch (error) {
    console.error('ZM2 reject submission error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Hospital Routes






// Physician Routes






// Survey Submission Route
app.post('/api/submit-survey', protect, async (req, res) => {
  try {
    const { physicianName, speciality, selectedHospitalCodes, hospitalData, sourceFunds, patientDistributionMatrix, additionalInsights } = req.body;

    const survey = await prisma.surveySubmission.create({
      data: {
        physicianName,
        speciality,
        selectedHospitalCodes: JSON.stringify(selectedHospitalCodes),
        hospitalData: hospitalData,
        sourceFunds: sourceFunds,
        patientDistributionMatrix: JSON.stringify(patientDistributionMatrix),
        additionalInsights,
        submittedBy: req.user.id,
      },
    });

    res.status(200).json({ message: 'Survey data received and saved successfully!', surveyId: survey.id });
  } catch (error) {
    console.error('Error saving survey data:', error);
    res.status(500).json({ message: 'Failed to save survey data.', error: error.message });
  }
});

// Start server
console.log('Attempting to start server...');
const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server startup error:', err);
});
