import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const studentSchema = new Schema({
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
  internship: [
    [
      {
        date: Date,
        taskDescription: String,
        grade: Number,
      },
    ],
  ],
  email: {
    type: String,
    required: [true, 'Lūdzu ievadi e-pastu'],
  },
  phone: {
    type: Number,
    required: [true, 'Lūdzu ievadi telefona numuru'],
  },
  password: {
    type: String,
    required: [true, 'Lūdzu ievadi paroli'],
  },
});

const Student = mongoose.model('student', studentSchema);

export default Student;
