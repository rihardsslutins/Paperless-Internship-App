import jwt from 'jsonwebtoken';

const authenticateJWT = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // get token from authorization header
      token = req.headers.authorization.split(' ')[1];

      // verify token
      jwt.verify(token, process.env.JWT_SECRET_STRING, (err, decoded) => {
        // Get user from token
        console.log('IM HERE : ' + decoded);
        req.user = decoded;
        next();
      });
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Not Authorized');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('No Token');
  }
};

export { authenticateJWT };
