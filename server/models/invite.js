// packages
import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail.js'

// models
import { User } from "./user.js";

const Schema = mongoose.Schema

const inviteSchema = new Schema({
    student: {
        type: String,
        required: [true, 'Studenta e-pasts netika pievienots'],
        validate: [isEmail, 'Pievienotais studenta e-pasts nav derīgs'],
    },
    studentFullName: {
        type: String,
        required: [true, 'Studenta pilnais vārds nav pievienots']
    },
    teacher: {
        type: String,
        required: [true, 'Skolotāja e-pasts netika pievienots'],
        validate: [isEmail, 'Pievienotā skolotāja e-pasts nav derīgs'],
    },
    teacherFullName: {
        type: String,
        required: [true, 'Skolotāja pilnais vārds nav pievienots']
    },
    subject: {
        type: String,
        required: [true, 'Lūdzu pievieno ielūguma tēmu']
    },
    body: {
        type: String,
        required: [true, 'Lūdzu ievadi ielūguma tekstu']
    },
}, 
{
    timestamps: true
}
)

inviteSchema.statics.invite = async function (student, teacher) {
    if (teacher) {
        const Student = await User.findOne({ email: student, role: 'student' })
        if (Student) {
            const Teacher = await User.findOne({ email: teacher, role: 'teacher' })
            if (Teacher) {
                const teachersArray = Student.teachers.filter(object => object.email === teacher)
                console.log(teachersArray)
                if (!teachersArray.length) {
                    const invite = await Invite.findOne({ student, teacher})
                    console.log(invite)
                    if (!invite) {
                        Invite.create({
                            student, 
                            teacher, 
                            studentFullName: `${Student.name + ' ' + Student.surname}`, 
                            teacherFullName: `${Teacher.name + ' ' + Teacher.surname}`,
                            subject: 'Prakses dienasgrāmata',
                            body: `${Student.name + ' ' + Student.surname} no ${Student.school} uzaicināja Jūs pievienoties savām dienasgrāmatām.`
                        })
                    } else {
                        throw Error('Pieteikumus vienam skolotājam atkārtoti nevar sūtīt')
                    }
                } else {
                    throw Error('Skolotājs jau ir akceptējis Jūsu ielūgumu')
                } 
            } else {
                throw Error('Pievienotā skolotāja e-pasts neeksistē')
            }
        } else {
            throw Error('Pievienotā studenta e-pasts neeksistē')
        }
    } else {
        throw Error('Lūdzu pievieno skolotāja e-pastu')
    }
}


const Invite = mongoose.model('invite', inviteSchema);

export { Invite };