import express from 'express';
import Internship from '../models/internship';
const internshipRouter = express.Router();

// create an internship
internshipRouter.post('/internships', (req, res) => {
  const internship = new Internship({
    company: req.body.company,
    position: req.body.position,
    body: req.body.body,
  });
});

export default internshipRouter;
