import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schoolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  teachers: [String],
  students: [String],
  classes: [String],
});

const School = mongoose.model('school', schoolSchema);

export default School;
