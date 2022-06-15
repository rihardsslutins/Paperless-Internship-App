// handles errors
export const handleErrors = (emptyErrorObject, err, role) => {
  
    // the yet unpopulated errors object
    const errors = emptyErrorObject;
  
    // assigns whatever error the User model returned to the errors object defined above
    if (err.message.includes(`invite validation failed`)) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
    
    if (err.message === 'Lūdzu pievieno skolotāja e-pastu') {
      errors.teacher = 'Lūdzu pievieno skolotāja e-pastu'
    }
    if (err.message === 'Pievienotā studenta e-pasts neeksistē') {
      errors.student = 'Pievienotā studenta e-pasts neeksistē'
    }
    if (err.message === 'Pievienotā skolotāja e-pasts neeksistē') {
      errors.teacher = 'Pievienotā skolotāja e-pasts neeksistē'
    }
    if (err.message === 'Pieteikumus vienam skolotājam atkārtoti nevar sūtīt') {
      errors.teacher = 'Pieteikumus vienam skolotājam atkārtoti nevar sūtīt'
    }
    if (err.message === 'Skolotājs jau ir akceptējis Jūsu ielūgumu') {
      errors.teacher = 'Skolotājs jau ir akceptējis Jūsu ielūgumu'
    }
  
    return errors;
  };