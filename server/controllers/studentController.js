// models
import Student from '../models/student.js';

const student_create = async (req, res) => {
  const { name, surname, phone, school, email, password } = req.body;
  try {
    const student = await Student.create({ name, surname, phone, school, email, password });
    res.status(201).json(student);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// student_index -> get all

export { student_create };
