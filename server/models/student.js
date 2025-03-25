const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String },
  nationality: { type: String },
  religion: { type: String },
  class: { type: String, required: true },
  department: { type: String },
  previousSchool: { type: String },
  currentSchool: { type: String },
  lastExamResults: { type: String },
  guardianContact: { type: String, required: true },
  studentContact: { type: String },
  email: { type: String },
  currentAddress: { type: String, required: true },
  permanentAddress: { type: String },
  courseFee: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  discount: { type: Number },
  profilePhoto: { type: String },
  guardianOccupation: { type: String },
  specialNeeds: { type: String },
  hostelFacility: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const StudentModel = mongoose.model('Student', studentSchema);
module.exports = StudentModel;
