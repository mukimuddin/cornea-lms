const express = require('express');
const connectDB = require('./db.js');
const itemModel = require('./models/item.js');
const StudentModel = require('./models/student.js');
const cors = require('cors');
const path = require('path');

require('dotenv').config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, '../dist')));

// API Routes
app.get('/api/items', async (req, res) => {
  try {
    const response = await itemModel.find();
    res.json({ items: response });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const newStudent = new StudentModel(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error('Error saving student:', error);
    res.status(500).json({ error: 'Failed to add student' });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const students = await StudentModel.find(); // Fetch all students
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.post('/api/admins', async (req, res) => {
  try {
    const { username } = req.body;

    // Check if the username already exists
    const existingAdmin = await StudentModel.findOne({ username }); // Assuming admins are stored in the same collection
    if (existingAdmin) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const newAdmin = new StudentModel(req.body); // Replace with AdminModel if admins are stored separately
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    console.error('Error adding admin:', error);
    res.status(500).json({ error: 'Failed to add admin' });
  }
});

// Fallback to index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});