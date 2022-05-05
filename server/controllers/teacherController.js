// models
import Teacher from '../models/teacher.js';

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
  
  return errors;
  // console.log(Object.values(err.errors))
};

const teacher_create = async (req, res) => {
  const { name, surname, gender, phone, school, email, password } = req.body;
  try {
    const teacher = await Teacher.create({ name, surname, gender, phone, school, email, password });
    res.status(201).json(teacher);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
};

// teacher_index -> get all

export { teacher_create };
