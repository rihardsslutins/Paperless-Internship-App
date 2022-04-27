import express from 'express';

// controllers
import { user_create } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/users', user_create);

export default userRouter;
