// models
import { Internship } from "../models/internship.js";
import { User } from "../models/user.js";

// functions


// @desc handle internship creation
// @route POST /internship
// @access Private
const internship_create = async (req, res) => {
    let errors = {
        company: '',
        studentEmail: '',
        teacherEmail: '',
        supervisorEmail: '',
        startingDate: '', 
    }
    // handles error object from mongoose
    const handleErrors = (err) => {
        if (err.message.includes('internship validation failed')) {
            Object.values(err.errors).forEach(({ properties }) => {
              errors[properties.path] = properties.message;
            });
          }
    }

    // get data from the front-end
    const { company, studentEmail, teacherEmail, supervisorEmail, startingDate } = req.body;
    
    // query the database
    try {
        // check if the emails the student sent are valid
        const teacher = await User.findOne({email: teacherEmail, role: 'teacher'})
        const supervisor = await User.findOne({email: supervisorEmail, role: 'supervisor'})

        if (!teacher) {
            errors.teacherEmail = 'Ievadītais prakses vadītāju (no skolas) epasts neeksistē';
            throw Error('Ievadītais prakses vadītāju (no skolas) epasts neeksistē');
        }

        if (!supervisor) {
            errors.teacherSupervisor = 'Ievadītais prakses vadītāju (no uzņēmuma) epasts neeksistē';
            throw Error('Ievadītais prakses vadītāju (no uzņēmuma) epasts neeksistē');
        }

        console.log(teacher)

        const internship = await Internship.create({ isActive: true, company, studentEmail, teacherEmail, supervisorEmail, startingDate });
        console.log(internship)
        res.status(201).json({message: 'Dienasgrāmata ir izveidota!'})

        
    } catch (err) {
        console.log(err)
        handleErrors(err)
        res.status(400).json({ errors })
    }
}

export { internship_create }