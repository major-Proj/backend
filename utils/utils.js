const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';


const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, accessTokenSecret, (err, decoded) => {
      if (err) {
        res.status(401).send('Invalid token');
      } else {
        req.user = decoded; // Attach decoded user data to the request
        next();
      }
    });
  } else {
    res.status(401).send('Unauthorized');
  }
};

module.exports = {
    authenticateJWT
  }