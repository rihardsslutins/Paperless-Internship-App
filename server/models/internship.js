// packages
import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail.js'

const Schema = mongoose.Schema;

const internshipSchema = new Schema({
    isActive: {
        type: Boolean,
        required: [true, 'Praksei nav iestatīta aktivitātes īpašība']
    },
    company: {
        type: String,
        required: [true, 'Lūdzu ievadi uzņēmuma nosaukumu']
    },
    supervisorEmail: {
        type: String,
        required: [true, 'Lūdzu ievadi prakses vadītāja (no uzņēmuma) e-pastu'],
        lowercase: true,
        validate: [isEmail, 'Lūdzu ievadi prakses vadītāja (no uzņēmuma) e-pastu pareizi']
    },
    teacherEmail: {
        type: String,
        required: [true, 'Lūdzu ievadi prakses vadītāja (no skolas) e-pastu'],
        lowercase: true,
        validate: [isEmail, 'Lūdzu ievadi prakses vadītāja (no skolas) e-pastu pareizi']
    },
    studentEmail: {
        type: String,
        required: [true, 'Studenta e-pasts nav sasniedzams'],
        lowercase: true,
        validate: [isEmail, 'Studenta e-pasts nav derīgs'],
    },
    startingDate: {
        type: String,
        required: [true, 'Lūdzu ievadi datumu kurā sākās prakse']
    },
    journal: {
        type: Array
    }
});

const Internship = mongoose.model('internship', internshipSchema);

export { Internship };