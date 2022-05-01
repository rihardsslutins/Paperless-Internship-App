import express from 'express';

// controllers
import { mentor_create } from '../controllers/mentorController';

const mentorRouter = express.Router();

mentorRouter.post('/mentors', mentor_create);

export default teacherRouter;
