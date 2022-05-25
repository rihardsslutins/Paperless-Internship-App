import express from 'express';

// controllers
import { student_create, student_login, student_me } from '../controllers/studentController.js';

// middleware
import { authenticateJWT } from '../middleware/authMiddleware.js';

const studentRouter = express.Router();

studentRouter.post('/students', student_create);

studentRouter.post('/students-login', student_login);

studentRouter.get('/students-me', authenticateJWT, student_me);

export default studentRouter;
