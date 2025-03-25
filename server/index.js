const express = require('express');
const connectDB = require('./db.js');
const itemModel = require('./models/item.js');
const StudentModel = require('./models/student.js');
const cors = require('cors');
const path = require('path');
const { body, validationResult } = require('express-validator');

require('dotenv').config(); // Load environment variables

const app = express();
app.use(cors());-frontend-live-domain.com'], // Replace with your live frontend domain
app.use(express.json());  methods: ['GET', 'POST', 'PUT', 'DELETE'],

// Connect to MongoDB
connectDB();app.use(express.json());

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, '../dist')));connectDB();

// API Routes
app.get('/api/items', async (req, res) => {(express.static(path.join(__dirname, '../dist')));
  try {
    const response = await itemModel.find();
app.get('/api/items', async (req, res) => {s: response });
  try {
    const response = await itemModel.find();
    res.json({ items: response }); res.status(500).json({ error: 'Failed to fetch items' });
  } catch (error) {
    console.error('Error fetching items:', error);});
    res.status(500).json({ error: 'Failed to fetch items' });
  }t('/api/students', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),es) => {
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); res.status(201).json(savedStudent);
  } catch (error) {
  try {    console.error('Error saving student:', error);
    const newStudent = new StudentModel(req.body);dd student' });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error('Error saving student:', error);nts', async (req, res) => {
    res.status(500).json({ error: 'Failed to add student' });
  }dents
}); res.json(students); // Ensure the response is in JSON format
 catch (error) {
app.get('/api/students', async (req, res) => {    console.error('Error fetching students:', error);
  try {fetch students' });
    const students = await StudentModel.find(); // Fetch all students
    res.json(students); // Ensure the response is in JSON format
  } catch (error) {
    console.error('Error fetching students:', error); {
    res.status(500).json({ error: 'Failed to fetch students' });
  } req.body;
});
/ Check if the username already exists
app.post('/api/admins', async (req, res) => {    const existingAdmin = await StudentModel.findOne({ username }); // Assuming admins are stored in the same collection
  try {
    const { username } = req.body;sername already exists' });

    // Check if the username already exists
    const existingAdmin = await StudentModel.findOne({ username }); // Assuming admins are stored in the same collection // Replace with AdminModel if admins are stored separately
    if (existingAdmin) {
      return res.status(400).json({ error: 'Username already exists' }); res.status(201).json(savedAdmin);
    } catch (error) {
    console.error('Error adding admin:', error);
    const newAdmin = new StudentModel(req.body); // Replace with AdminModel if admins are stored separatelyto add admin' });
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    console.error('Error adding admin:', error);// Fallback to index.html for React Router
    res.status(500).json({ error: 'Failed to add admin' });res) => {
  }./dist/index.html'));
});

// Fallback to index.html for React RouterStart the server









});  console.log(`Server is running on port ${PORT}`);app.listen(PORT, () => {const PORT = process.env.PORT || 5000;// Start the server});  res.sendFile(path.join(__dirname, '../dist/index.html'));app.get('*', (req, res) => {const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});