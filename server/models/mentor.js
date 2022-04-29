import mongoose from 'mongoose';

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
  gender: {
    type: String,
    required: [true, 'Lūdzu izvēlies dzimumu'],
  },
  email: {
    type: String,
    required: [true, 'Lūdzu ievadi e-pastu'],
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
    },
    phone: {
      type: Number,
      required: [true, 'Lūdzu ievadi uzņēmuma telefona numuru'],
    },
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

const Mentor = mongoose.model('mentor', mentorSchema);

export default Mentor;
