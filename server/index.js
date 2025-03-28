console.log('Starting server...');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { body, validationResult } = require('express-validator');
const StudentModel = require('./models/student.js');

require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://cornea-lms.vercel.app'], // Add your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies and credentials
}));

// Increase payload size limit
app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to MongoDB
if (!process.env.MONGO_URI || typeof process.env.MONGO_URI !== 'string') {
    console.error('Error: MONGO_URI is not defined or invalid in the .env file.');
    console.error('Please ensure the .env file exists and contains the correct MongoDB connection string.');
    process.exit(1);
}

// Debug MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err.message);
        process.exit(1);
    });

// API Routes
app.get('/api/students', async (req, res) => {
  try {
    console.log('Fetching students...');
    const students = await StudentModel.find(); // Ensure StudentModel is correctly imported
    console.log('Students fetched:', students);
    res.json(students); // Send JSON response
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    console.log('Adding a new student:', req.body);
    const newStudent = new StudentModel(req.body);
    const savedStudent = await newStudent.save();
    console.log('Student added:', savedStudent);
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error('Error saving student:', error);
    res.status(500).json({ error: 'Failed to add student' });
  }
});

// Root route to confirm the server is running
app.get('/', (req, res) => {
  res.send('Backend is running. Use the API endpoints to interact with the server.');
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

if (process.env.VERCEL) {
  module.exports = app; // Export the app for Vercel
} else {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
// filepath: /workspaces/cornea-lms/server/index.js
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err.message);
        process.exit(1);
    });