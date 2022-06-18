import mongoose from "mongoose";
// models
import { Internship } from "../models/internship.js";
import { User } from "../models/user.js";
import { Invite } from '../models/invite.js'

// functions

// @desc handle internship creation
// @route POST /internship
// @access Private
const internship_create = async (req, res) => {

    let errors = {
        isActive: '',
        isPending: '',
        company: '',
        student: '',
        studentFullName: '',
        studentPhone: '',
        teacher: '',
        teacherFullName: '',
        supervisor: '',
        supervisorFullName: '',
        startingDate: '', 
    }

    const handleErrors = (err) => {
        if (err.message.includes('internship validation failed')) {
            Object.values(err.errors).forEach(({ properties }) => {
              errors[properties.path] = properties.message;
            });
          }
    }

    // get data from the front-end
    const { company, student, teacher, supervisor, startingDate } = req.body;
    
    // query the database
    try {
        const internship = await Internship.findOne({ student, isActive: true })
        if (!internship) {
            // check if the emails the student sent are valid
            const Teacher = await User.findOne({ email: teacher, role: 'teacher' })
            const Supervisor = await User.findOne({ email: supervisor, role: 'supervisor' })
            const Student = await User.findOne({ email: student, role: 'student' })
    
            if (!Teacher) {
                errors.teacher = 'Ievadītais prakses vadītāju (no skolas) epasts neeksistē';
                throw Error('Ievadītais prakses vadītāju (no skolas) epasts neeksistē');
            }
    
            if (!Supervisor) {
                errors.supervisor = 'Ievadītais prakses vadītāju (no uzņēmuma) epasts neeksistē';
                throw Error('Ievadītais prakses vadītāju (no uzņēmuma) epasts neeksistē');
            }
            
            const { _id } = await Internship.create({ 
                isActive: true, 
                isPending: true, 
                company, 
                student, 
                studentFullName: `${Student.name} ${Student.surname}`,
                studentPhone: Student.phone,
                teacher, 
                teacherFullName: `${Teacher.name} ${Teacher.surname}`,
                supervisor, 
                supervisorFullName: `${Supervisor.name} ${Supervisor.surname}`,
                startingDate
             });
            Student.internships.push(_id)
            await Student.save()
            await Invite.create({ 
                sender: student, 
                receiver: supervisor, 
                senderFullName: `${Student.name + ' ' + Student.surname}`, 
                senderPhone: Student.phone,
                receiverFullName: `${Supervisor.name + ' ' + Supervisor.surname}`,
                receiverRole: Supervisor.role,
                subject: 'Prakses dienasgrāmata',
                body: `${Student.name + ' ' + Student.surname} no ${Student.school} uzaicināja Jūs pievienoties savai Dienasgrāmatai, uzņēmumā ${company}.`
            })
            return res.status(201).json({ message: 'Dienasgrāmata ir izveidota!' })
        } else {
            errors.student = "Studentam nevar būt vairākas aktīvas dienasgrāmatas vienlaikus"
            throw Error("Studentam nevar būt vairākas aktīvas dienasgrāmatas vienlaikus")
        }
        
    } catch (err) {
        console.log(err)
        handleErrors(err)
        return res.status(400).json({ errors })
    }
}

const get_internships = async (req, res) => {
    try {
        const { email } = await User.findById(req.user.id)
        const internships = await Internship.find({student: email})
        return res.status(200).json({ internships })
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}

const get_internships_supervisor = async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const { email } = await User.findById(req.params.id)
            const internship = await Internship.findOne({ student: email })
            return res.status(200).json({ internship })
        } else {
            throw Error("ID parameter doesn't exist")
        }
    } catch (err) {
        return res.status(400).json({ message: 'Could not retrieve any internships'})
    }
}

const get_internships_teacher = async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const { email } = await User.findById(req.params.id)
            const internships = await Internship.find({ student: email })
            return res.status(200).json({ internships })
        } else {
            throw Error("ID parameter doesn't exist")
        }
    } catch (err) {
        return res.status(400).json({ message: 'Could not retrieve any internships'})
    }
}

const get_internships_student = async (req, res) => {
    try {
        console.log(req.user)
        const { email } = await User.findById(req.user.id)
        const internship = await Internship.findOne({ student: email, isActive: true })
        return res.status(200).json({ internship })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

const get_internship = async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const internship = await Internship.findOne({_id: req.params.id});
            return res.status(200).json({ internship });
        } else {
            throw Error("ID parameter doesn't exist")
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }
}

const journal_record_create = async (req, res) => {
    const { _id, date, taskDescription, hoursSpent } = req.body

    let errors = {
        date: '',
        taskDescription: '',
        hoursSpent: '',
    }

    console.log(req.body);

    const handleErrors = (err) => {
        if (err.message.includes('internship validation failed')) {
            Object.values(err.errors).forEach(({ properties }) => {
                console.log(properties.message)
              errors[properties.path] = properties.message;
            });
          }
    }
    try {
        const internship = await Internship.findOne({_id}).clone()
        internship.journal.push({
            date,
            taskDescription,
            hoursSpent,
        })

        await internship.save()
        return res.status(201).json({ internship })
    } catch (err) {
        handleErrors(err)
        return res.status(400).json({ errors })
    }
}

const journal_record_add_grade = async (req, res) => {
    const { id, grade } = req.body
    try {
        const { email } = await User.findOne({ _id: id })
        const _id = req.params.id
        const internship = await Internship.findOne({ student: email })
        internship.journal.map((record) => {
            if (record._id.toString() === _id) {
            record.grade = grade
            }
        })
        await internship.save()
        
        return res.status(200).json({ internship })
    } catch (err) {
        let errors = {
            grade: ''
        }
        const handleErrors = (err) => {
            if (err.message.includes('internship validation failed')) {
                Object.values(err.errors).forEach(({ properties }) => {
                    console.log(properties.message)
                  errors[properties.path] = properties.message;
                });
              }
        }
        handleErrors(err)
        return res.status(400).json({ errors })
    }

}

export { internship_create, get_internships, get_internship, journal_record_create, get_internships_supervisor, get_internships_teacher, get_internships_student, journal_record_add_grade }