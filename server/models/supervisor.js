import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const supervisorSchema = new Schema({
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
    required: [true, 'Lūdzu ievadi dzimumu'],
  },
  phone: {
    type: Number,
    required: [true, 'Lūdzu ievadi telefona numuru'],
  },
  field: {
    type: String,
    required: [true, 'Lūdzu ievadi nozari'],
  },
  company: {
    name: {
      type: String,
      required: [true, 'Lūdzu ievadi uzņēmuma nosaukumu'],
    },
    address: {
      country: {
        type: String,
        required: [true, 'Lūdzu ievadi uzņēmuma valsti'],
      },
      city: {
        type: String,
        required: [true, 'Lūdzu ievadi uzņēmuma pilsētu'],
      },
      zipCode: {
        type: String,
        required: [true, 'Lūdzu ievadi uzņēmuma pasta indeksu'],
      },
      streetName: {
        type: String,
        required: [true, 'Lūdzu ievadi uzņēmuma ielas nosaukumu'],
      },
      streetNumber: {
        type: Number,
        required: [true, 'Lūdzu ievadi uzņēmuma ielas numuru'],
      },
    },
    registrationNumber: {
      type: String,
      required: [true, 'Lūdzu ievadi uzņēmuma reģistrācijas numuru'],
    },
    email: {
      type: String,
      required: [true, 'Lūdzu ievadi uzņēmuma e-pastu'],
      lowercase: true,
      validate: [isEmail, 'Lūdzu ievadi derīgu uzņēmuma e-pastu'],
    },
    phone: {
      type: Number,
      required: [true, 'Lūdzu ievadi uzņēmuma telefona numuru'],
    },
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

supervisorSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Supervisor = mongoose.model('supervisor', supervisorSchema);

export default Supervisor;
