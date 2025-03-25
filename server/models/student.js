const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  class: { type: String, required: true },
  gender: { type: String, required: true },
  guardianContact: { type: String, required: true },
  currentAddress: { type: String, required: true },
  courseFee: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  // ...other fields...
});

studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const StudentModel = mongoose.model('Student', studentSchema);
module.exports = StudentModel;
