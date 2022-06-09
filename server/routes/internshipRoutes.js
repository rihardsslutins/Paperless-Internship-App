import express from 'express';

// controllers
import { internship_create, get_internships, get_internship, journal_record_create } from '../controllers/internshipController.js';

// // middleware
import { protect } from '../middleware/authMiddleware.js';

const internshipRouter = express.Router();

// create a single internship
internshipRouter.post('/internships', protect, internship_create);

// get internships
internshipRouter.get('/internships', protect, get_internships)

// get a single internship
internshipRouter.get('/internships/:id', protect, get_internship)

// create a journal record
internshipRouter.post('/journals', protect, journal_record_create)

export default internshipRouter;