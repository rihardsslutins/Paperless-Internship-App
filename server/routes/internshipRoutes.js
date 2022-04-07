import express from 'express';
import Internship from '../models/internship';
const router = express.Router();

// create an internship
router.post('/internships', (req, res) => {
  const internship = new Internship({
    company: req.body.company,
    position: req.body.position,
    body: req.body.body,
  });
});
