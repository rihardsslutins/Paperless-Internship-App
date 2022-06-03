import express from 'express';

// controllers
import { internship_create, get_internships, get_internship } from '../controllers/internshipController.js';

// // middleware
import { protect } from '../middleware/authMiddleware.js';

const internshipRouter = express.Router();

// create internship route
internshipRouter.post('/internship', protect, internship_create);
internshipRouter.get('/get-internships', protect, get_internships)
internshipRouter.post('/get-internship', get_internship)

export default internshipRouter;