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
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  bloodGroup: { type: String },
  nationality: { type: String },
  religion: { type: String },
  department: { type: String },
  previousSchool: { type: String },
  currentSchool: { type: String },
  lastExamResults: { type: String },
  studentContact: { type: String },
  permanentAddress: { type: String },
  discount: { type: Number },
  profilePhoto: { type: String },
  guardianOccupation: { type: String },
  specialNeeds: { type: String },
  hostelFacility: { type: String },
});

studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const StudentModel = mongoose.model('Student', studentSchema);
module.exports = StudentModel;
