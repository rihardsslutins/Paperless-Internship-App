// packages
import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail.js'

const Schema = mongoose.Schema

const journalSchema = new Schema({
    date: {
        type: String,
        required: [true, 'Lūdzu ievadi datumu'],
    },
    taskDescription: {
        type: String,
        required: [true, 'Lūdzu ievadi aprakstu']
    },
    hoursSpent: {
        type: Number,
        required: [true, 'Lūdzu ievadi pavadīto laiku'],
        max: [8, 'Lūdzu ievadi pavadīto stundu skaitu, kas nepārsniedz 8'],
        min: [1, 'Lūdzu ievadi pavadīto stundu skaitu, kas ir vienāds ar vai pārsniedz 1']
    },
    grade: {
        type: Number,
        max: [10, 'Lūdzu ievadi atzīmi, kas nepārsniedz 10'],
        min: [1, 'Lūdzu ievadi atzīmi, kas ir vienāda ar vai pārsniedz 1'],
    }
})

const internshipSchema = new Schema({
    isActive: {
        type: Boolean,
        required: [true, 'Praksei nav iestatīta aktivitātes īpašība']
    },
    isPending: {
        type: Boolean,
        required: [true, 'Praksei nav iestatīta verifikācijas īpašība']
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
    supervisorFullName: {
        type: String,
        required: [true, 'Prakses vadītāja pilnais vārds netika pievienots']
    },
    teacher: {
        type: String,
        required: [true, 'Lūdzu ievadi prakses vadītāja (no skolas) e-pastu'],
        lowercase: true,
        validate: [isEmail, 'Lūdzu ievadi prakses vadītāja (no skolas) e-pastu pareizi']
    },
    teacherFullName: {
        type: String,
        required: [true, 'Skolotāja pilnais vārds nav pievienots'],
    },
    student: {
        type: String,
        required: [true, 'Studenta e-pasts nav sasniedzams'],
        lowercase: true,
        validate: [isEmail, 'Studenta e-pasts nav derīgs'],
    },
    studentFullName: {
        type: String,
        required: [true, 'Studenta pilnais vārds nav pievienots']
    },
    studentPhone: {
        type: Number,
        required: [true, 'Studenta tālrunis nav pievienots']
    },
    startingDate: {
        type: String,
        required: [true, 'Lūdzu ievadi datumu kurā sākās prakse']
    },
    journal: {
        type: [journalSchema],
        // validate: (element) => {
        //     throw Error(`sdfdsfsd ${element[0]}`)
        // }
    }
});

const Internship = mongoose.model('internship', internshipSchema);

export { Internship };