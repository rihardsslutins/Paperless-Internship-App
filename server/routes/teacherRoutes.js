import express from 'express';

// controllers
import { teacher_create } from '../controllers/teacherController.js';

const teacherRouter = express.Router();

teacherRouter.post('/teachers', teacher_create);

export default teacherRouter;
