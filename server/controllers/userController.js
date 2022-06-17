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
    return res.status(400).json({ errors });
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
    return res
      .status(200)
      .cookie('auth', token, { httpOnly: false, maxAge: maxAge * 1000 })
      .send();
  } catch (err) {
    let emptyErrors = {
      email: '',
      password: '',
    };
    const errors = handleErrors(emptyErrors, err);
    return res.status(400).json({ errors });
  }
};

// @desc handle user logout
// @route POST /logout
// @access Public
const user_logout = async (req, res) => {
  return res.status(200).cookie('auth', '', { maxAge: 1 }).send()
}


// @desc Get user data
// @route GET /me
// @access Private
const user_get_me = async (req, res) => {
  try {
    const { id, name, surname, gender, phone, school, field, company, internships, teachers, students, email, password, role } =
    await User.findById(req.user.id);
  res
    .status(200)
    .json({ id, name, surname, gender, phone, school, field, company, internships, teachers, students, email, password, role });
  } catch (err) {
    return res.status(401).json({ error: "Not authorized" })
  }
};

// @desc Update user basic data
// @route POST /tbd
// @access Public
const change_me = async (req, res) => {
  const { id, role, name, surname, school, phone, field, company } = req.body
  console.log(role)
  try {
  //   switch (role) {
  //     case 'student':
  //       let student = await User.findOne({ _id: id });
  //       console.log(student)
  //       student.name = name
  //       student.surname = surname
  //       student.school = school
  //       student.phone = phone
        
  //       student.save()
  //       res.status(200).json({ student })
  //       break;
  //     case 'teacher':
  //       let teacher = await User.findOne({ _id: id });
  //       console.log(teacher)
  //       teacher.name = name
  //       teacher.surname = surname
  //       teacher.school = school
  //       teacher.phone = phone
        
  //       teacher.save()
  //       res.status(200).json({ teacher })
  //       break;
  //     case 'supervisor':
  //       let supervisor = await User.findOne({ _id: id });
  //       supervisor.name = name
  //       supervisor.surname = surname
  //       supervisor.field = field
  //       supervisor.company = company
  //       supervisor.phone = phone

  //       supervisor.save()
  //       res.status(200).json({ supervisor })
  //       break;
  //     default:
  //       break;
  //   }

    // let user;
    // if (role === 'student') {
    //     let student = await User.findOne({ _id: id });
    //     console.log(student)
    //     student.name = name
    //     student.surname = surname
    //     student.school = school
    //     student.phone = phone
    // }

    const user = await User.findOne({ _id: id })

    console.log(user)

    user.name = name,
    user.surname = surname,
    user.school = school,
    user.phone = phone
    user.field = field
    user.company = company

    await user.save()
    console.log(user)

    return res.status(200).json({ user })
  } catch (err) {
    let emptyErrors = {
      name: '',
      surname: '',
      school: '',
      field: '',
      company: '',
      phone: '',
    }
    console.log(err)
    const errors = handleErrors(emptyErrors, err, role);
    return res.status(400).json({ errors });
  }
}

// @desc handle user password reset
// @route POST /tbd
// @access Private
const reset_password = async (req, res) => {
  const { id, oldPassword, newPassword } = req.body
  console.log(id)
  try {
    const user = await User.reset(id, oldPassword, newPassword);
    
    await user.save()
    return res.status(200).json({ user })
  } catch (err) {
    let emptyErrors = {
      password: ''
    }
    const errors = handleErrors(emptyErrors, err)
    return res.status(400).json({ errors })
  }
}

const get_user_list = async (req, res) => {
  const { role, students, interns } = await User.findById(req.user.id)
  try {
    let users
    if (role === 'teacher') {
      let studentsArray = []
      await Promise.all(students.map(async (student) => {
          const user = await User.findOne({ email: student.email })
          studentsArray.push(user)
          console.log(user)
      }))
      console.log(studentsArray)
      users = studentsArray
    }
    if (role === 'supervisor') {
      let internsArray = []
      await Promise.all(interns.map(async (intern) => {
          const user = await User.findOne({ email: intern.email })
          internsArray.push(user)
      }))
      users = internsArray
    }
        
    return res.status(200).json({ users })

  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: err.message })
  }
}



export { user_create, user_login, user_logout, user_get_me, change_me, reset_password, get_user_list };
