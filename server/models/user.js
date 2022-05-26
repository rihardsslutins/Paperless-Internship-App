// packages
import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const options = { discriminatorKey: 'role' };

const userSchema = new Schema(
  {
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
    gender: {
      type: String,
      required: [true, 'Lūdzu ievadi dzimumu'],
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
  },
  options,
);

// hashes password
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// authorizes a user (sends them user data by way of token)
userSchema.statics.login = async function (email, password) {
  // finds a user with the entered email
  const user = await this.findOne({ email });
  if (user) {
    // compares the entered password with the existing user in the collection with the previously entered email
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Ievadītā parole ir nepareiza');
  }
  throw Error('Ievadītais e-pasts ir nepareizs');
};

const User = mongoose.model('user', userSchema);

const StudentUser = User.discriminator(
  'student',
  new Schema({
    school: {
      type: String,
      required: [true, 'Lūdzu ievadi skolu'],
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
  }),
  options,
);

const TeacherUser = User.discriminator(
  'teacher',
  new Schema(
    {
      school: {
        type: String,
        required: [true, 'Lūdzu ievadi skolu'],
      },
      students: {
        type: [String],
      },
    },
    options,
  ),
);

const SupervisorUser = User.discriminator(
  'supervisor',
  new Schema(
    {
      field: {
        type: String,
        required: [true, 'Lūdzu ievadi nozari'],
      },
      company: {
        type: String,
        required: [true, 'Lūdzu ievadi uzņēmumu'],
      },
    },
    options,
  ),
);

export { User, StudentUser, TeacherUser, SupervisorUser };
