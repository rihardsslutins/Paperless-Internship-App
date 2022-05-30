// packages
import jwt from 'jsonwebtoken';

// handleErrors() returns a custom error object,
// that is meant to be sent to the client,
// from whatever error the User model returned
const handleErrors = (emptyErrorObject, err, role) => {
  // REGISTER

  // the yet unpopulated errors object
  const errors = emptyErrorObject;

  // checks whether the entered email already exists in the users database
  if (err.code === 11000) {
    errors.email = 'E-pasts jau ir reģistrēts';
    return errors;
  }

  // assigns whatever error the User model returned to the errors object defined above
  if (err.message.includes(`${role} validation failed`)) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  // ------------------------------------------------------------------------------------

  // LOGIN

  // checks whether or not the entered email exists in the database
  if (err.message === 'Ievadītais e-pasts ir nepareizs') {
    errors.email = 'Ievadītais e-pasts ir nepareizs';
  }

  // checks whether or not the entered password corresponds to the user with the previously entered email
  if (err.message === 'Ievadītā parole ir nepareiza') {
    errors.password = 'Ievadītā parole ir nepareiza';
  }

  return errors;
};

const createToken = (id) => {
  const maxAge = 3 * 24 * 60 * 60;
  return jwt.sign({ id }, process.env.JWT_SECRET_STRING, {
    expiresIn: maxAge,
  });
};

export { handleErrors, createToken };
