// models
import Teacher from '../models/teacher.js';

const teacher_create = async (req, res) => {
  const { name, surname, phone, school, email, password } = req.body;
  try {
    const teacher = await Teacher.create({ name, surname, phone, school, email, password });
    res.status(201).json(teacher);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// teacher_index -> get all

export { teacher_create };
