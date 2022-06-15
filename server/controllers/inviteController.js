// models
import { Invite } from "../models/invite.js";
import { User } from "../models/user.js";

// functions
import { handleErrors } from "./invite.services.js";

const send_invite = async (req, res) => {
    const { student, teacher } = req.body;
    try {
        const invite = await Invite.invite(student, teacher)
        return res.status(201).json({ invite })
    } catch (err) {
        const emptyErrorObject = {
            teacher: '',
            teacherFullName: '',
            student: '',
            studentFullName: '',
            subject: '',
            body: ''
        }
        const errors = handleErrors(emptyErrorObject, err)
        return res.status(400).json({ errors })
    }
}

const get_invites = async (req, res) => {
    const { email } = await User.findById(req.user.id)
    try {
        const invites = await Invite.find({ teacher: email }) 
        return res.status(200).json({ invites })  
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

const reject_invite = async (req, res) => {
    const _id = req.params.id
    try {
        const invite = await Invite.findByIdAndDelete(_id);  
        return res.status(200).json({ invite })
    } catch (err) {
        return res.status(400).json({ message: err.message })
        console.log(err)
    }
}

const accept_invite = async (req, res) => {
    const _id = req.params.id
    try {
        const invite = await Invite.findOne({_id})
        const { teacherFullName, studentFullName, teacher, student } = invite

        const Student = await User.findOne({ email: student })
        Student.teachers.push({ 
            fullName: teacherFullName, 
            email: teacher 
        })
        await Student.save()

        console.log(Student)
        const Teacher = await User.findOne({ email: teacher })
        Teacher.students.push({
            fullName: studentFullName,
            email: student
        })
        await Teacher.save()

        await invite.remove()

        return res.status(200).json({ Teacher })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }
}

// const get_invited_teachers = async (req, res) => {
//     const { email } = User.findOne({ _id: req.user.id })
//     try {
//         const invites = await Invite.find({ student: email })
//         return res.status(200).json({ invites })
//     } catch (err) {
//         console.log(err)
//         return res.status(400).json({ message: err.message })
//     }
// }

export { send_invite, get_invites, reject_invite, accept_invite }