const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'aiarjun027@gmail.com',
            pass: 'hhfm nzhs orqe jcqg',
         },
    secure: true,
    });


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
    authenticateJWT,
    transporter
  }