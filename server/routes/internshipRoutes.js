import express from 'express';

// controllers
import { internship_create, get_internships, get_internship, journal_record_create } from '../controllers/internshipController.js';

// // middleware
import { protect } from '../middleware/authMiddleware.js';

const internshipRouter = express.Router();

// create internship route
internshipRouter.post('/internship', protect, internship_create);

// get all user internships
internshipRouter.get('/get-internships', protect, get_internships)

// get single user internships by id
internshipRouter.post('/get-internship', get_internship)

// create a journal record
internshipRouter.post('/journal-record', journal_record_create)

export default internshipRouter;