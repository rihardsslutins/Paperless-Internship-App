// mongoose
import mongoose from "mongoose";
// models
import { Internship } from "../models/internship.js";
import { User } from "../models/user.js";
import { Invite } from '../models/invite.js'
// functions
import { handleErrors } from './internship.services.js'

// @desc handles internship creation
// @route POST /internships
// @access Private
const post_internships = async (req, res) => {
    // get data from the front-end
    const { company, student, teacher, supervisor, startingDate } = req.body;
    // query the database
    try {
        const internship = await Internship.findOne({ student, isActive: true })
        if (!internship) {
            // gets the teacher, supervisor and student documents, that will be used to populate the internship document
            const Teacher = await User.findOne({ email: teacher, role: 'teacher' })
            const Supervisor = await User.findOne({ email: supervisor, role: 'supervisor' })
            const Student = await User.findOne({ email: student, role: 'student' })
            
            // creates the internship
            const internship = await Internship.create({ 
                isActive: true, 
                isPending: true, 
                company, 
                student, 
                studentFullName: `${Student ? Student.name + ' ' + Student.surname : null}`,
                studentPhone: Student.phone,
                teacher, 
                teacherFullName: `${Teacher ? Teacher.name + ' ' + Teacher.surname : null}`,
                supervisor, 
                supervisorFullName: `${Supervisor ? Supervisor.name + ' ' + Supervisor.surname : null}`,
                startingDate
             });

            // adds the created internship id to the student's internships property array
            Student.internships.push(internship._id)
            // saves the altered Student object
            await Student.save()

            // creates an invite addressed to the assigned supervisor
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

            return res.status(201).json({ internship })
        } else {
            throw Error("Studentam nevar būt vairākas aktīvas dienasgrāmatas vienlaikus")
        }
        
    } catch (err) {
        const errors = handleErrors(err)
        return res.status(400).json({ errors })
    }
}

// @desc handles internship fetching
// @route GET /internships
// @access Private
const get_internships = async (req, res) => {
    try {
        // grabs the email and role property values from the user object returned from the authorization middleware
        const { email, role } = await User.findById(req.user.id)

        let internships;

        // assigns a value to the internships variable based on what role user has sent the get request
        if (role === 'student') {
            internships = await Internship.find({ student: email })
        } else if (role === 'teacher') {
            internships = await Internship.find({ teacher: email })
        } else if (role === 'supervisor') {
            internships = await Internship.find({ supervisor: email, isActive: true, isPending: false })
        }

        return res.status(200).json({ internships })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

// @desc handles internship fetching for teacher
// @route GET /internships/teacher/:id
// @access Private
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
        return res.status(400).json({ message: err.message })
    }
}

// @desc handles a single internship's fetching
// @route GET /internships/:id
// @access Private
const get_single_internships = async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const { email, role } = await User.findById(req.user.id)
            let internship
            if (role === 'student') {
                internship = await Internship.findOne({ _id: req.params.id, student: email })
            } else if (role === 'teacher') {
                let checkInternship = await Internship.findById(req.params.id)
                const user = await User.findOne({ email: checkInternship.student })
                const isFound = user.teachers.some(teacher => {
                    if (teacher.email === email) {
                      return true;
                    }
                    return false;
                });
                if (!isFound) {
                    throw Error('Dienasgrāmata neeksistē')
                }
                internship = checkInternship
            } else if (role === 'supervisor') {
                internship = await Internship.findOne({ _id: req.params.id, supervisor: email })
            }

            return res.status(200).json({ internship });
        } else {
            throw Error("ID parameter doesn't exist")
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }
}

// @desc handles creation of a journal record
// @route POST /journals
// @access Private
const post_journal = async (req, res) => {
    const { _id, date, taskDescription, hoursSpent } = req.body

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
        const errors = handleErrors(err)
        return res.status(400).json({ errors })
    }
}

// @desc handles a journal record's grading
// @route PUT /journals/:id
// @access Private
const put_journal = async (req, res) => {
    const { id, grade } = req.body
    try {
        const internship = await Internship.findById(id)
        const _id = req.params.id
        internship.journal.map((record) => {
            if (record._id.toString() === _id) {
            record.grade = grade
            }
        })
        await internship.save()
        
        return res.status(200).json({ internship })
    } catch (err) {
        console.log(err)
        const errors = handleErrors(err)
        return res.status(400).json({ errors })
    }

}



export { post_internships, get_internships, get_internships_teacher, get_single_internships, post_journal, put_journal }