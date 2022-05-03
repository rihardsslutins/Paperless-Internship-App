// models
import Mentor from '../models/mentor.js';

const handleErrors = (err) => {
  console.log(err.message, err.code);
  const errors = {
    name: '',
    surname: '',
    gender: '',
    phone: '',
    field: '',
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
  // console.log(Object.values(err.errors))
};

const mentor_create = async (req, res) => {
  const { name, surname, gender, phone, field, company, email, password } = req.body;
  try {
    const mentor = await Mentor.create({ name, surname, gender, phone, field, company, email, password });
    res.status(201).json(mentor);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export { mentor_create };
