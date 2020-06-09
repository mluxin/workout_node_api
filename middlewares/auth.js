/*
Imports
*/
const jwt = require('jsonwebtoken');

/*
Exports
*/
  module.exports = (req, res, next) => {

  const token = req.headers['x-access-token'];

    if (!token) {
      res.status(401).send({
        auth: false,
        message: 'No token given'
      });
    }
    else {
      jwt.verify(token, 'RANDOM_TOKEN_SECRET', (err, decoded) => {
        if(err) {
          res.status(500).send({
            auth: false,
            message: 'Fail with token ginven'
          });
        }
        else {
          req.userId = decoded.id;
          next();
        }
      });
    }
  };

