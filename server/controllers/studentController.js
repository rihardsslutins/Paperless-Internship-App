// packages
import jwt from 'jsonwebtoken';

// models
import Student from '../models/student.js';

// creates a custom handle errors object
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

  if (err.message.includes('student validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  // incorrect email when logging in
  if (err.message === 'Ievadītais e-pasts ir nepareizs') {
    errors.email = 'Ievadītais e-pasts ir nepareizs';
  }

  // incorrect password when logging in
  if (err.message === 'Ievadītā parole ir nepareiza') {
    errors.password = 'Ievadītā parole ir nepareiza';
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60; // the amount of time is measured in seconds

// creates a jwt token
const createToken = (student) => {
  return jwt.sign({ student }, process.env.JWT_SECRET_STRING, {
    expiresIn: maxAge,
  });
};

const student_create = async (req, res) => {
  const { name, surname, gender, phone, school, email, password } = req.body;
  try {
    const student = await Student.create({ name, surname, gender, phone, school, email, password });

    // creates a JWT
    const token = createToken(student);
    // res.cookie('jwt', token, { maxAge: maxAge, SameSite: 'None', Secure: true });
    // res.status(201).json({ token });

    // setting a cookie
    res
      .cookie('jwt', token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      })
      .send();
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// handle student login
const student_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.login(email, password);
    const token = createToken(student);
    // const user = await Student.findById(student._id);
    // res.status(200).json({ user: user });
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }).send();
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const student_me = async (req, res) => {
  await Student.findById(req.user.id);
  // res.json({ message: 'User data display', user: req.user });
  res.status(200).json({
    user: req.user,
    // id: id,
    // name: name,
    // email: email,
  });
};

export { student_create, student_login, student_me };
