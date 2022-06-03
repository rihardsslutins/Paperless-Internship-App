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
        student: '',
        teacher: '',
        supervisor: '',
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
    const { company, student, teacher, supervisor, startingDate } = req.body;
    
    // query the database
    try {
        // check if the emails the student sent are valid
        const Teacher = await User.findOne({email: teacher, role: 'teacher'})
        const Supervisor = await User.findOne({email: supervisor, role: 'supervisor'})

        if (!Teacher) {
            errors.teacher = 'Ievadītais prakses vadītāju (no skolas) epasts neeksistē';
            throw Error('Ievadītais prakses vadītāju (no skolas) epasts neeksistē');
        }

        if (!Supervisor) {
            errors.supervisor = 'Ievadītais prakses vadītāju (no uzņēmuma) epasts neeksistē';
            throw Error('Ievadītais prakses vadītāju (no uzņēmuma) epasts neeksistē');
        }

        await Internship.create({ isActive: true, company, student, teacher, supervisor, startingDate });
        res.status(201).json({message: 'Dienasgrāmata ir izveidota!'})
        
    } catch (err) {
        console.log(err)
        handleErrors(err)
        res.status(400).json({ errors })
    }
}

const get_internships = async (req, res) => {
    try {
        const { email } = await User.findById(req.user.id)
        const internships = await Internship.find({student: email})
        await Promise.all(internships.map(async (internship) => {
                const teacher = await User.findOne({email: internship.teacher})
                const supervisor = await User.findOne({email: internship.supervisor})
                internship.teacher = `${teacher.name} ${teacher.surname}`
                internship.supervisor = `${supervisor.name} ${supervisor.surname}`
            }))
        res.status(200).json({internships})
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const get_internship = async (req, res) => {
    try {
        const internship = await Internship.findOne({_id: req.body._id});
        let { _id, isActive, company, teacher, supervisor, startingDate, journal } = internship;
        const Teacher = await User.findOne({email: internship.teacher})
        const Supervisor = await User.findOne({email: internship.supervisor})
        teacher = `${Teacher.name} ${Teacher.surname}`
        supervisor = `${Supervisor.name} ${Supervisor.surname}`
        res.status(200).json({ _id, isActive, company, teacher, supervisor, startingDate, journal });
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
    }
}

export { internship_create, get_internships, get_internship }