import express from 'express';

// controllers
import { mentor_create } from '../controllers/mentorController.js';

const mentorRouter = express.Router();

mentorRouter.post('/mentors', mentor_create);

export default mentorRouter;
