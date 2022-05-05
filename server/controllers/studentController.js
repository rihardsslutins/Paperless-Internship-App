// models
import Student from '../models/student.js';

const handleErrors = (err) => {
  const errors = {
    name: '',
    surname: '',
    gender: '',
    phone: '',
    school: '',
    email: '',
    password: '',
  };

  if (err.code === 11000) {
    errors.email = 'E-pasts jau ir reģistrēts';
    return errors;
  }

  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });
  
  return errors
  // console.log(Object.values(err.errors))
};

const student_create = async (req, res) => {
  const { name, surname, gender, phone, school, email, password } = req.body;
  try {
    const student = await Student.create({ name, surname, gender, phone, school, email, password });
    res.status(201).json(student);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// student_index -> get all

export { student_create };
