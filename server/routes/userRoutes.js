import express from 'express';

// controllers
import { user_create, user_login, user_logout, user_get_me, change_me, reset_password } from '../controllers/userController.js';

// // middleware
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

// register route
userRouter.post('/user', user_create);

// login route
userRouter.post('/login', user_login);

// logout route
userRouter.get('/logout', user_logout)

// get the logged in user's data
userRouter.get('/me', protect, user_get_me);

// update logged in user's info
userRouter.post('/change-me', protect, change_me)

// reset logged in user's password
userRouter.post('/reset', protect, reset_password)

export default userRouter;
