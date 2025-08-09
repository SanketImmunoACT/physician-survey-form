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

// --- API Routes (will be populated from Next.js API logic) ---

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  const { name, email } = req.body;
  try {
    // In Next.js, this route might have handled password directly or sent an email for password setup.
    // For now, we'll just create a pending user. Password setup will be handled via reset-password flow.
    const user = await prisma.user.create({
      data: {
        name,
        email,
        // For registration, we don't set a password directly here. It will be set via the approval/reset flow.
        // A placeholder or null password might be used depending on your user model and approval flow.
        password: '', // Placeholder, will be updated on approval
        role: 'SALESPERSON', // Default role for new registrations
        status: 'PENDING', // User needs admin approval
      },
    });
    res.status(201).json({ message: 'Registration request submitted. Awaiting admin approval.', user: { id: user.id, email: user.email, status: user.status } });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    if (user.status === 'PENDING') {
      return res.status(403).json({ error: 'Account is pending approval.' });
    }

    if (user.status === 'DENIED') {
      return res.status(403).json({ error: 'Account has been denied.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 3600000, // 1 hour
      sameSite: 'Lax', // Adjust as needed for your deployment
    }).json({ message: 'Logged in successfully', role: user.role });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0),
    sameSite: 'Lax',
  }).json({ message: 'Logged out successfully' });
});

app.get('/api/auth/me', protect, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role, status: user.status });
  } catch (error) {
    console.error('Fetch user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a password reset token (e.g., using crypto or a dedicated library)
    const resetToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour

    // In a real application, you would send an email to the user with this resetToken
    // For this example, we'll just log it and return it (for testing purposes)
    console.log(`Password reset token for ${email}: ${resetToken}`);

    // You would typically send an email like this:
    // await sendEmail({
    //   to: user.email,
    //   subject: 'Password Reset Request',
    //   text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${process.env.FRONTEND_URL}/reset-password?token=${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    // });

    res.json({ message: 'Password reset link sent to your email.', resetToken }); // Returning resetToken for testing
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/auth/reset-password', async (req, res) => {
  const { token, password } = req.body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword, status: 'ACTIVE' }, // Activate user on password set
    });

    res.json({ message: 'Password has been reset.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(400).json({ message: 'Invalid or expired token.' });
  }
});

// Admin Routes
app.get('/api/admin/users', protect, async (req, res) => {
  if (req.user.role !== 'SUPERADMIN') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  const { status } = req.query;
  try {
    const users = await prisma.user.findMany({
      where: status ? { status } : {},
      select: { id: true, name: true, email: true, role: true, status: true },
    });
    res.json(users);
  } catch (error) {
    console.error('Fetch admin users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/admin/users/:userId/approve', protect, async (req, res) => {
  if (req.user.role !== 'SUPERADMIN') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  const { userId } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required for approval' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { status: 'ACTIVE', password: hashedPassword },
    });
    res.json({ message: 'User approved', user: { id: user.id, email: user.email, status: user.status } });
  } catch (error) {
    console.error('Approve user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/admin/users/:userId/deny', protect, async (req, res) => {
  if (req.user.role !== 'SUPERADMIN') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  const { userId } = req.params;
  try {
    await prisma.user.delete({
      where: { id: parseInt(userId) },
    });
    res.json({ message: 'User denied and deleted' });
  } catch (error) {
    console.error('Deny user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Hospital Routes
app.get('/api/hospitals', protect, async (req, res) => {
  const { status } = req.query;
  try {
    const hospitals = await prisma.hospital.findMany({
      where: status ? { status } : {},
    });
    res.json(hospitals);
  } catch (error) {
    console.error('Fetch hospitals error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/hospitals', protect, async (req, res) => {
  const { name } = req.body;
  try {
    const userEmail = req.user.email; // Store in local variable
    const hospital = await prisma.hospital.create({
      data: {
        name,
        status: 'PENDING',
        requestedBy: userEmail,
      },
    });
    res.status(201).json({ message: 'Hospital request submitted', hospital });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Hospital with this name already exists.' });
    }
    console.error('Create hospital error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/admin/hospitals/:hospitalId/approve', protect, async (req, res) => {
  if (req.user.role !== 'SUPERADMIN') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  const { hospitalId } = req.params;
  try {
    const hospital = await prisma.hospital.update({
      where: { id: parseInt(hospitalId) },
      data: { status: 'ACTIVE' },
    });
    res.json({ message: 'Hospital approved', hospital });
  } catch (error) {
    console.error('Approve hospital error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Physician Routes
app.get('/api/physicians', protect, async (req, res) => {
  const { status } = req.query;
  try {
    const physicians = await prisma.physician.findMany({
      where: status ? { status } : {},
    });
    res.json(physicians);
  } catch (error) {
    console.error('Fetch physicians error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/physicians', protect, async (req, res) => {
  const { name } = req.body;
  try {
    const userEmail = req.user.email; // Store in local variable
    const physician = await prisma.physician.create({
      data: {
        name,
        status: 'PENDING',
        requestedBy: userEmail,
      },
    });
    res.status(201).json({ message: 'Physician request submitted', physician });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Physician with this name already exists.' });
    }
    console.error('Create physician error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/admin/physicians/:physicianId/approve', protect, async (req, res) => {
  if (req.user.role !== 'SUPERADMIN') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  const { physicianId } = req.params;
  try {
    const physician = await prisma.physician.update({
      where: { id: parseInt(physicianId) },
      data: { status: 'ACTIVE' },
    });
    res.json({ message: 'Physician approved', physician });
  } catch (error) {
    console.error('Approve physician error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

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
