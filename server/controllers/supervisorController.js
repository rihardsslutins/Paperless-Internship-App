// packages
import jwt from 'jsonwebtoken';
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

const maxAge = 3 * 24 * 60 * 60; // the amount of time is measured in seconds

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_STRING, {
    expiresIn: maxAge,
  });
};

const supervisor_create = async (req, res) => {
  const { name, surname, gender, phone, field, company, email, password } = req.body;
  try {
    const supervisor = await Supervisor.create({ name, surname, gender, phone, field, company, email, password });
    // creates a JWT
    const token = createToken(supervisor._id);
    // res.cookie('jwt', token, { maxAge: maxAge, SameSite: 'None', Secure: true });
    // res.status(201).json({ token });

    // setting a cookie
    res
      .status(201)
      .cookie('jwt', token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      })
      .send('cookie sent');
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export { supervisor_create };
