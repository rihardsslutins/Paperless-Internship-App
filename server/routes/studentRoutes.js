import express from 'express';

// controllers
import { student_create, student_login } from '../controllers/studentController.js';
const studentRouter = express.Router();

studentRouter.post('/students', student_create);

studentRouter.post('/students-login', student_login);

export default studentRouter;
