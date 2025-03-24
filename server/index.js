// mongodb+srv://mukim_uddin:<db_password>@cluster0.mesxr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


const express = require('express');

const connectDB = require('./db.js');
const itemModel = require('./models/item.js');
const app = express();

connectDB();
app.listen(5000, () => {   console.log('Server is running on port 5000');
});