// models
import User from '../models/user.js';

const user_create = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).send(`${err.message}`);
  }
};

export { user_create };
