// packages
import jwt from 'jsonwebtoken';

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

  return errors;
  // console.log(Object.values(err.errors))
};

const maxAge = 3 * 24 * 60 * 60; // the amount of time is measured in seconds

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_STRING, {
    expiresIn: maxAge,
  });
};

const student_create = async (req, res) => {
  const { name, surname, gender, phone, school, email, password } = req.body;
  try {
    const student = await Student.create({ name, surname, gender, phone, school, email, password });

    // creates a JWT
    const token = createToken(student._id);
    // res.cookie('jwt', token, { maxAge: maxAge, SameSite: 'None', Secure: true });
    // res.status(201).json({ token });

    // setting a cookie
    res
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

// student_index -> get all

export { student_create };
