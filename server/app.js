import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';

// routers
import internshipRouter from './routes/internshipRoutes';

// creates an express app
const app = express();

// runs express app on the PORT variable or 3000
app.listen(process.env.PORT || 3000, () => {
  console.log(`server running on port: ${process.env.PORT || 3000}`);
});

// - - - - - - - - - - - - - - - - - - - - - - - - - -

// MIDDLEWARE

// allows cross site resource sharing
app.use(cors());
// parses data coming into the server into json
app.use(express.json);
