import mongoose from 'mongoose';
import { isEmail } from 'validator';

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
  phone: {
    type: Number,
    required: [true, 'Lūdzu ievadi telefona numuru'],
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

const Student = mongoose.model('student', studentSchema);

export default Student;
