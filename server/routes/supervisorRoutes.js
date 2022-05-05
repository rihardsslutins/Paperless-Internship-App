import express from 'express';

// controllers
import { supervisor_create } from '../controllers/supervisorController.js';

const supervisorRouter = express.Router();

supervisorRouter.post('/supervisors', supervisor_create);

export default supervisorRouter;
