import Internship from '../models/internship';

const internship_create_post = (req, res) => {
  const internship = new Internship({
    company: req.body.company,
    position: req.body.position,
    body: req.body.body,
  });
  internship.save();
};

const internship_index = (req, res) => {
  const allInternships = Internship.find();
  res.send(allInternships);
};

export { internship_create_post, internship_index };
