import express from 'express';

// controllers
import { student_create } from '../controllers/studentController.js';
const studentRouter = express.Router();

studentRouter.post('/students', student_create);

export default studentRouter;
