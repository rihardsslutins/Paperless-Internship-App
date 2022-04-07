import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// schema defines the structure of your document
const internshipSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// model provides an interface to the database for adding, deleting, updating etc. documents
const Internship = mongoose.model('internship', internshipSchema);
export default Internship;
