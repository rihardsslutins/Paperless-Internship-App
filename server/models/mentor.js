import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mentorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  company: {
    address: {
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      streetName: {
        type: String,
        required: true,
      },
      streetNumber: {
        type: Number,
        required: true,
      },
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Mentor = mongoose.model('mentor', mentorSchema);

export default Mentor;
