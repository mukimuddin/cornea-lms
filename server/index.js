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
  origin: ['http://localhost:5173'], // Ensure this matches your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.get('/api/students', async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.post('/api/students', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
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
