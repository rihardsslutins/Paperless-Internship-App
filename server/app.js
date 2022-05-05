import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';

// routers
import studentRouter from './routes/studentRoutes.js';
import teacherRouter from './routes/teacherRoutes.js';
import supervisorRouter from './routes/supervisorRoutes.js';

// creates an express app
const app = express();

// runs express app on the PORT variable or 3000
app.listen(process.env.PORT || 3000, () => {
  console.log(`server running on port: ${process.env.PORT || 3000}`);
});

// - - - - - - - - - - - - - - - - - - - - - - - - -

// MIDDLEWARE

// parses the posted JSON data into a JavaScript object -> the request.body object
app.use(express.json());
// allows cross-origin resource sharing
app.use(cors());

// - - - - - - - - - - - - - - - - - - - - - - - - -

// DATABASE CONNECTION

// connects to database using mongoose
mongoose
  .connect(process.env.DBURI)
  .then(() => {
    console.log('connected to database');
  })
  .catch((err) => {
    console.log(`The error when connecting to the database is: ${err}`);
  });

app.get('/', (req, res) => res.send('I exist'));

// user routes
app.use(studentRouter);
app.use(teacherRouter);
app.use(supervisorRouter);