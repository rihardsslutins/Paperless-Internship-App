import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const studentsSchema = new Schema({
  type: String,
});

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  students: {
    type: [studentsSchema],
  },
});
