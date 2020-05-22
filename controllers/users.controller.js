/*
Imports
*/
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');

const User = require('../models/user.schema');

/*

Methods
*/
exports.signup = (req, res, next) => {

  // Password crypt
  bcrypt.hash(req.body.password, 10) // 10=how many rounds you execute the hash

    // Create and Save in th db a new user with a crypted password
    .then(hash => {
      const user = new User ({
        email: req.body.email,
        password: hash,
      });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créer'}) )
        .catch(error => res.status(400).json({ error }) );
    })

    .catch(error => res.status(500).json({ error }) );
};


exports.login = (req, res, next) => {

  // Find user in DB which correspond to the email in the request
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }

      // Compare email request with the hash kept in DB
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//Parameters for the token : data you want to encode (payload) + secret key for encoding + config argument