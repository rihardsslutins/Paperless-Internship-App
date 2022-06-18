import express from 'express';

// controllers
import { internship_create, get_internships, get_internship, journal_record_create, get_internships_supervisor, get_internships_teacher, get_internships_student, journal_record_add_grade } from '../controllers/internshipController.js';

// // middleware
import { protect } from '../middleware/authMiddleware.js';

const internshipRouter = express.Router();

// create a single internship
internshipRouter.post('/internships', protect, internship_create);

// get internships
internshipRouter.get('/internships', protect, get_internships)

// get specific student internships
internshipRouter.get('/internships/supervisor/:id', protect, get_internships_supervisor)

// get specific student internships
internshipRouter.get('/internships/teacher/:id', protect, get_internships_teacher)

// get specific student internship
internshipRouter.get('/internships/student', protect, get_internships_student)

// get a single internship
internshipRouter.get('/internships/:id', protect, get_internship)

// create a journal record
internshipRouter.post('/journals', protect, journal_record_create)

// grade journal record
internshipRouter.put('/journals/:id', protect, journal_record_add_grade)

export default internshipRouter;