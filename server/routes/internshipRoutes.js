import express from 'express';

// controllers
import { internship_create, get_internships, get_internship, journal_record_create, get_internship_student, journal_record_add_grade } from '../controllers/internshipController.js';

// // middleware
import { protect } from '../middleware/authMiddleware.js';

const internshipRouter = express.Router();

// create a single internship
internshipRouter.post('/internships', protect, internship_create);

// get internships
internshipRouter.get('/internships', protect, get_internships)

// get specific student internships
internshipRouter.get('/internships/user/:id', protect, get_internship_student)

// get a single internship
internshipRouter.get('/internships/:id', protect, get_internship)

// create a journal record
internshipRouter.post('/journals', protect, journal_record_create)

// grade journal record
internshipRouter.put('/journals/:id', protect, journal_record_add_grade)

export default internshipRouter;