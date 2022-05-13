// models
import Supervisor from '../models/supervisor.js';

const handleErrors = (err) => {
  const errors = {
    name: '',
    surname: '',
    gender: '',
    phone: '',
    field: '',
    company: '',
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
};

const supervisor_create = async (req, res) => {
  const { name, surname, gender, phone, field, company, email, password } = req.body;
  try {
    const supervisor = await Supervisor.create({ name, surname, gender, phone, field, company, email, password });
    res.status(201).json(supervisor);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export { supervisor_create };
