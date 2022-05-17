import jwt from 'jsonwebtoken';

// check the authentication status
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check if jwt exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_STRING, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        // redirect to login page
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    // redirect to login page
  }
};

export { requireAuth };

// IF THE DATA THAT'S SUPPOSED TO EXIST DOESN'T EXIST, THE USER SHOULD BE REDIRECTED TO THEIR LAST PAGE
