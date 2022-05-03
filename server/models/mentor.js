import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

const Schema = mongoose.Schema;

const mentorSchema = new Schema({
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
  field: {
    type: String,
    required: [true, 'Lūdzu ievadi nozari'],
  },
  company: {
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
      unique: true,
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

const Mentor = mongoose.model('mentor', mentorSchema);

export default Mentor;
