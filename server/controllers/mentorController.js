// models
import Mentor from '../models/mentor.js';

const mentor_create = async (req, res) => {
  const { name, surname, phone, field, company, email, password } = req.body;
  try {
    const mentor = await Mentor.create({ name, surname, phone, field, company, email, password });
    res.status(201).json(mentor);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export { mentor_create };
