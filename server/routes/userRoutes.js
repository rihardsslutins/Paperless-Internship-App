import express from 'express';

// controllers
import { post_users, post_users_login, post_users_logout, get_users, put_users, put_users_password } from '../controllers/userController.js';

// // middleware
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

// register route
userRouter.post('/user', post_users);

// // get users
// userRouter.get('/user', protect, get_users_list)

// login route
userRouter.post('/login', post_users_login);

// logout route
userRouter.get('/logout', post_users_logout)

// get the logged in user's data
userRouter.get('/me', protect, get_users);

// update logged in user's info
userRouter.post('/change-me', protect, put_users)

// reset logged in user's password
userRouter.post('/reset', protect, put_users_password)

export default userRouter;
