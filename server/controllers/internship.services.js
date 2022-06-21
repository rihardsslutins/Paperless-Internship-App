// handles errors
const handleErrors = (err) => {
    // the yet unpopulated errors object
    const errors = {
      isActive: '',
      isPending: '',
      company: '',
      student: '',
      studentFullName: '',
      studentPhone: '',
      teacher: '',
      teacherFullName: '',
      supervisor: '',
      supervisorFullName: '',
      startingDate: '',
      date: '',
      taskDecription: '',
      hoursSpent: '',
      grade: ''
    }
  
    // assigns whatever error the User model returned to the errors object defined above
    if (err.message.includes('internship validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }

    // checks if the student has an active internship
    if (err.message === 'Studentam nevar būt vairākas aktīvas dienasgrāmatas vienlaikus') {
      errors.student = 'Studentam nevar būt vairākas aktīvas dienasgrāmatas vienlaikus';
    }
    return errors;
  };

  export { handleErrors }