import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcrypt';

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
  school: {
    type: String,
    required: [true, 'Lūdzu ievadi skolu'],
  },
  phone: {
    type: Number,
    required: [true, 'Lūdzu ievadi telefona numuru'],
  },
  gender: {
    type: String,
    required: [true, 'Lūdzu ievadi dzimumu'],
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

// hash password
studentSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// log in
studentSchema.statics.login = async function (email, password) {
  // finds a user with the entered email
  const student = await this.findOne({ email });
  if (student) {
    // compares the entered password with the existing user in the collection with the previously entered email
    const auth = await bcrypt.compare(password, student.password);
    if (auth) {
      return student;
    }
    throw Error('Ievadītā parole ir nepareiza');
  }
  throw Error('Ievadītais e-pasts ir nepareizs');
};

const Student = mongoose.model('student', studentSchema);

export default Student;
