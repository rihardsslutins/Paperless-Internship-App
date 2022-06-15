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
        return res.status(201).json({message: 'Dienasgrāmata ir izveidota!'})
        
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
        await Promise.all(internships.map(async (internship) => {
                const teacher = await User.findOne({email: internship.teacher})
                const supervisor = await User.findOne({email: internship.supervisor})
                internship.teacher = `${teacher.name} ${teacher.surname}`
                internship.supervisor = `${supervisor.name} ${supervisor.surname}`
            }))
        return res.status(200).json({internships})
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}

const get_internship = async (req, res) => {
    try {
        const internship = await Internship.findOne({_id: req.params.id});
        let { _id, isActive, company, student, teacher, supervisor, startingDate, journal } = internship;
        const Student = await User.findOne({email: internship.student})
        const Teacher = await User.findOne({email: internship.teacher})
        const Supervisor = await User.findOne({email: internship.supervisor})
        student = `${Student.name.charAt(0).toUpperCase() + Student.name.slice(1)} ${Student.surname.charAt(0).toUpperCase() + Student.surname.slice(1)}`
        teacher = `${Teacher.name.charAt(0).toUpperCase() + Teacher.name.slice(1)} ${Teacher.surname.charAt(0).toUpperCase() + Teacher.surname.slice(1)}`
        supervisor = `${Supervisor.name.charAt(0).toUpperCase() + Supervisor.name.slice(1)} ${Supervisor.surname.charAt(0).toUpperCase() + Supervisor.surname.slice(1)}`
        return res.status(200).json({ _id, isActive, company, student, teacher, supervisor, startingDate, journal });
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

export { internship_create, get_internships, get_internship, journal_record_create }