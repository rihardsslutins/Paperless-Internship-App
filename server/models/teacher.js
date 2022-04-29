import mongoose from 'mongoose';
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
  gender: {
    type: String,
    required: [true, 'Lūdzu izvēlies dzimumu'],
  },
  school: {
    type: String,
    required: [true, 'Lūdzu ievadi skolu'],
  },
  email: {
    type: String,
    required: [true, 'Lūdzu ievadi e-pastu'],
  },
  phone: {
    type: Number,
    required: [true, 'Lūdzu ievadi telefona numuru'],
  },
  students: {
    type: [String],
  },
});

const Teacher = mongoose.model('teacher', teacherSchema);

export default Teacher;
