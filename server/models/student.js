import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const studentSchema = new Schema({
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
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
  },
});

const Student = mongoose.model('student', studentSchema);

export default Student;
