console.log('Starting server...');
const express = require('express');
const connectDB = require('./db.js');
const cors = require('cors');
const path = require('path');
const { body, validationResult } = require('express-validator');
const StudentModel = require('./models/student.js');

require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://cornea-lms-1.onrender.com'], // Allow both local and production URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies and credentials
}));

// Increase payload size limit
app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to MongoDB
connectDB();

// API Routes
app.get('/api/students', async (req, res) => {
  try {
    const students = await StudentModel.find(); // Ensure StudentModel is correctly imported
    res.json(students); // Send JSON response
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.post('/api/students', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('class').notEmpty().withMessage('Class is required'),
  body('gender').notEmpty().withMessage('Gender is required'),
  body('guardianContact').notEmpty().withMessage('Guardian contact is required'),
  body('currentAddress').notEmpty().withMessage('Current address is required'),
  body('courseFee').isNumeric().withMessage('Course fee must be a number'),
  body('paymentStatus').notEmpty().withMessage('Payment status is required'),
  body('paymentMethod').notEmpty().withMessage('Payment method is required'),
  body('username').notEmpty().withMessage('Username is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newStudent = new StudentModel(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error('Error saving student:', error);
    res.status(500).json({ error: 'Failed to add student' });
  }
});

// Catch-all route for undefined API endpoints
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, '../dist')));

// Fallback route for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
