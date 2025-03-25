// mongodb+srv://mukim_uddin:<db_password>@cluster0.mesxr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require('express');
const connectDB = require('./db.js');
const itemModel = require('./models/item.js');
const StudentModel = require('./models/student.js'); // Import StudentModel
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", async (req, res) => {
  const response = await itemModel.find();
  return res.json({ items: response });
});

app.post('/students', async (req, res) => {
  try {
    const newStudent = new StudentModel(req.body); // Use StudentModel
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error('Error saving student:', error);
    res.status(500).json({ error: 'Failed to add student' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});