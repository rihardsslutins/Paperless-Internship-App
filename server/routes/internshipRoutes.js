import express from 'express';

// controllers
import { internship_create } from '../controllers/internshipController.js';

// // middleware
import { protect } from '../middleware/authMiddleware.js';

const internshipRouter = express.Router();

// create internship route
internshipRouter.post('/internship', protect, internship_create);

export default internshipRouter;