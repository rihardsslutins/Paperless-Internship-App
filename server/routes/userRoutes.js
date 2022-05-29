import express from 'express';

// controllers
import { user_create, user_login, get_me } from '../controllers/userController.js';

// // middleware
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

// register route
userRouter.post('/user', user_create);

// login route
userRouter.post('/login', user_login);

// get the logged in user's data
userRouter.get('/me', protect, get_me);

export default userRouter;
