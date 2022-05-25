import express from 'express';

// controllers
import { user_create } from '../controllers/userController.js';

// // middleware
// import { authenticateJWT } from '../middleware/authMiddleware.js';

const studentRouter = express.Router();

studentRouter.post('/user', user_create);

// studentRouter.post('/students-login', student_login);

// studentRouter.get('/students-me', authenticateJWT, student_me);

export default studentRouter;
