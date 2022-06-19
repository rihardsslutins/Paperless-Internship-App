import express from 'express';

// controllers
import { post_internships, get_internships, get_internships_teacher, get_single_internships, post_journal, put_journal } from '../controllers/internshipController.js';

// // middleware
import { protect } from '../middleware/authMiddleware.js';

const internshipRouter = express.Router();

// post an internship
internshipRouter.post('/internships', protect, post_internships);

// get internships
internshipRouter.get('/internships', protect, get_internships)

// get internships for teacher
internshipRouter.get('/internships/teacher/:id', protect, get_internships_teacher)

// get a single internship
internshipRouter.get('/internships/:id', protect, get_single_internships)

// create a journal record
internshipRouter.post('/journals', protect, post_journal)

// grade journal record
internshipRouter.put('/journals/:id', protect, put_journal)

// get specific student internships
// internshipRouter.get('/internships/supervisor/:id', protect, get_internships_supervisor)

// // get specific student internships
// internshipRouter.get('/internships/teacher/:id', protect, get_internships_teacher)

// // get specific student internship
// internshipRouter.get('/internships/student', protect, get_internships_student)

export default internshipRouter;