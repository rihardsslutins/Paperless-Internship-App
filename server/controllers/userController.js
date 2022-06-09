// models
import { User, StudentUser, TeacherUser, SupervisorUser } from '../models/user.js';

// functions
import { handleErrors, createToken } from './user.services.js';

const maxAge = 3 * 24 * 60 * 60; // the amount of time is measured in seconds

// @desc handle user registration
// @route POST /user
// @access Public
const user_create = async (req, res) => {
  // grabs the role with which the user is registering with from the role request header
  const role = req.headers.role;

  // destructuring properties from the req.body
  const { name, surname, gender, phone, school, field, company, email, password } = req.body;
  try {
    // creates the user/adds the user to the database based on what role the user chose
    let user = '';
    switch (role) {
      case 'student':
        user = await StudentUser.create({ name, surname, gender, phone, school, email, password });
        break;
      case 'teacher':
        user = await TeacherUser.create({ name, surname, gender, phone, school, email, password });
        break;
      case 'supervisor':
        user = await SupervisorUser.create({ name, surname, gender, phone, field, company, email, password });
        break;
      default:
        break;
    }

    // creates a JWT with the users id
    const token = createToken(user._id);

    // how long the token will last
    const maxAge = 3 * 24 * 60 * 60;

    // server sends a response -> status code of "CREATED" and a cookie that contains the JWT under the 'auth' name
    res
      .status(201)
      .cookie('auth', token, { httpOnly: false, maxAge: maxAge * 1000 })
      .send();
  } catch (err) {
    let emptyErrors = '';
    role === 'student'
      ? (emptyErrors = { name: '', surname: '', gender: '', phone: '', school: '', email: '', password: '' })
      : role === 'teacher'
      ? (emptyErrors = { name: '', surname: '', gender: '', phone: '', school: '', email: '', password: '' })
      : role === 'supervisor'
      ? (emptyErrors = {
          name: '',
          surname: '',
          gender: '',
          phone: '',
          field: '',
          company: '',
          email: '',
          password: '',
        })
      : '';
    const errors = handleErrors(emptyErrors, err, role);
    res.status(400).json({ errors });
  }
};

// @desc handle user login
// @route POST /login
// @access Public
const user_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    // const user = await Student.findById(student._id);
    // res.status(200).json({ user: user });
    res
      .status(200)
      .cookie('auth', token, { httpOnly: false, maxAge: maxAge * 1000 })
      .send();
  } catch (err) {
    let emptyErrors = {
      email: '',
      password: '',
    };
    const errors = handleErrors(emptyErrors, err);
    res.status(400).json({ errors });
  }
};

// @desc Get user data
// @route GET /me
// @access Private
const user_get_me = async (req, res) => {
  try {
    const { id, name, surname, gender, phone, school, field, company, internships, email, password, role } =
    await User.findById(req.user.id);
  res
    .status(200)
    .json({ id, name, surname, gender, phone, school, field, company, internships, email, password, role });
  } catch (err) {
    res.status(401).json({ error: "Not authorized" })
  }
};

// @desc Update user basic data
// @route POST /user
// @access Public
const change_me = async (req, res) => {
  const { id, role, name, surname, school, phone, field, company, oldPassword, newPassword } = req.body
  try {
    console.log(req.body)
    // switch (role) {
    //   case 'student':
    //     user = await User.findOneAndUpdate({ email }, { $set: { name, surname, school, phone } });
    //     break;
    //   case 'teacher':
    //     user = await User.findOneAndUpdate({ email }, { name, surname, gender, phone, school, email, password });
    //     break;
    //   case 'supervisor':
    //     user = await User.findOneAndUpdate({ email }, { name, surname, gender, phone, field, company, email, password });
    //     break;
    //   default:
    //     break;
    // }
    const user = await User.findOne({ id }).clone()

    user.name = name,
    user.surname = surname,
    user.school = school,
    user.phone = phone
    user.field = field
    user.company = company

    await user.save()
    console.log(user)

    res.status(200).json({ user })
  } catch (err) {
    let emptyErrors = {
      name: '',
      surname: '',
      school: '',
      phone: '',
    }
    const errors = handleErrors(emptyErrors, err, role);
    res.status(400).json({ errors });
  }
}

// @desc handle user registration
// @route POST /user
// @access Private
const reset_password = async (req, res) => {
  const { id, oldPassword, newPassword } = req.body
  try {
    const user = await User.reset(id, oldPassword, newPassword);

    await user.save()
    res.status(200).json({ user })
  } catch (err) {
    let emptyErrors = {
      password: ''
    }
    const errors = handleErrors(emptyErrors, err)
    res.status(400).json({ errors })
  }
}

export { user_create, user_login, user_get_me, change_me, reset_password };
