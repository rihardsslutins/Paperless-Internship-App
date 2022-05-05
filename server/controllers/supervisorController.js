// models
import Supervisor from '../models/supervisor.js';

const handleErrors = (err) => {

  const errorsCompanyAddress = { 
    country: '',
    city: '',
    zipCode: '',
    streetName: '',
    streetNumber: '',
}

  const company = {
    name: '',
    address: errorsCompanyAddress,
    registrationNumber: '',
    email: '',
    phone: '',
  }

  const errors = {
    name: '',
    surname: '',
    gender: '',
    phone: '',
    field: '',
    company: company,
    email: '',
    password: '',
  };

  if (err.code === 11000) {
    errors.email = 'E-pasts jau ir reģistrēts';
    return errors;
  }

  Object.values(err.errors).forEach(({ properties }) => {
    if (!properties.path.includes('company')) {
      errors[properties.path] = properties.message;
    }
    if (properties.path.includes('company') && !properties.path.includes('company.address')) {
      company[properties.path.slice(8)] = properties.message;
    }
    if (properties.path.includes('company.address.')) {
      errorsCompanyAddress[properties.path.slice(16)] = properties.message;
    }
  });
  return errors
};

const supervisor_create = async (req, res) => {
  const { name, surname, gender, phone, field, company, email, password } = req.body;
  try {
    const supervisor = await Supervisor.create({ name, surname, gender, phone, field, company, email, password });
    res.status(201).json(supervisor);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
};

export { supervisor_create };
