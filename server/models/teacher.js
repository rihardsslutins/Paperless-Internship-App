import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Lūdzu ievadi vārdu'],
  },
  surname: {
    type: String,
    required: [true, 'Lūdzu ievadi uzvārdu'],
  },
  phone: {
    type: Number,
    required: [true, 'Lūdzu ievadi telefona numuru'],
  },
  school: {
    type: String,
    required: [true, 'Lūdzu ievadi skolu'],
  },
  students: {
    type: [String],
  },
  email: {
    type: String,
    required: [true, 'Lūdzu ievadi e-pastu'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Lūdzu ievadi derīgu e-pastu'],
  },
  password: {
    type: String,
    required: [true, 'Lūdzu ievadi paroli'],
    minlength: [8, 'Parole nevar būt īsāka par 8 rakstzīmēm'],
  },
});

const Teacher = mongoose.model('teacher', teacherSchema);

export default Teacher;
