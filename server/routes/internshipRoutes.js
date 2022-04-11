import express from 'express';
import Internship from '../models/internship';
const internshipRouter = express.Router();

// controllers
import { internship_index, internship_create_post } from '../controllers/internshipController';

// create an internship
internshipRouter.post('/internships', internship_create_post);

// get all internships
internshipRouter.get('/internships', internship_index);

export default internshipRouter;
