import express from 'express';

// controllers
import { user_create, user_login } from '../controllers/userController.js';

// // middleware
// import { authenticateJWT } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

// @ route "/user"
// POST request
// Register
userRouter.post('/user', user_create);

// @ route "login"
// POST request
// Login
userRouter.post('/login', user_login);

// studentRouter.get('/students-me', authenticateJWT, student_me);

export default userRouter;
