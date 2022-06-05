// packages
import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail.js'

const Schema = mongoose.Schema;

const Journal = new Schema({
    date: {
        type: String
    },
    taskDescription: {
        type: String
    },
    hoursSpent: {
        type: Number
    },
    grade: {
        type: Number
    }
})

const internshipSchema = new Schema({
    isActive: {
        type: Boolean,
        required: [true, 'Praksei nav iestatīta aktivitātes īpašība']
    },
    company: {
        type: String,
        required: [true, 'Lūdzu ievadi uzņēmuma nosaukumu']
    },
    supervisor: {
        type: String,
        required: [true, 'Lūdzu ievadi prakses vadītāja (no uzņēmuma) e-pastu'],
        lowercase: true,
        validate: [isEmail, 'Lūdzu ievadi prakses vadītāja (no uzņēmuma) e-pastu pareizi']
    },
    teacher: {
        type: String,
        required: [true, 'Lūdzu ievadi prakses vadītāja (no skolas) e-pastu'],
        lowercase: true,
        validate: [isEmail, 'Lūdzu ievadi prakses vadītāja (no skolas) e-pastu pareizi']
    },
    student: {
        type: String,
        required: [true, 'Studenta e-pasts nav sasniedzams'],
        lowercase: true,
        validate: [isEmail, 'Studenta e-pasts nav derīgs'],
    },
    startingDate: {
        type: String,
        required: [true, 'Lūdzu ievadi datumu kurā sākās prakse']
    },
    journal: [Journal]
});

const Internship = mongoose.model('internship', internshipSchema);

export { Internship };