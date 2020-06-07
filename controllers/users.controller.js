/*
Imports
*/
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');

const User = require('../models/user.schema');
const Practice = require('../models/practice.schema');
const Goal = require('../models/goal.schema');
const Workout = require('../models/workout.schema');

/*

Methods
*/
exports.signup = (req, res, next) => {

  // Password crypt
  bcrypt.hash(req.body.password, 10) // 10=how many rounds you execute the hash

    // Create and Save in th db a new user with a crypted password
    .then(hashedPassword => {
        req.body.password = hashedPassword;

        // Save user data
        User.create(req.body)
        .then(() => res.status(201).json({ message: 'Utilisateur crée'}) )
        .catch(error => res.status(400).json({ error : 'Utilisateur non crée' }) );
    })

    .catch(error => res.status(500).json({ error : 'Oops'}) );
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

          Promise.all([
            Practice.find({ userId: user._id}),
            Goal.find({ userId: user._id}),
            Workout.find({ userId: user._id})
          ])
          .then((apiResponse) => {
            return res.status(201).json({
              message: "Pratiques, objectifs et entrainements en lien avec l'utilisateur",
              practices:apiResponse[0],
              goals:apiResponse[1],
              workouts:apiResponse[2],
              user,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            })
          })
          .catch((apiResponse) => {
            return res.status(400).json({
              message: 'Elements non trouvés',
              practices:null,
              goals:null,
              workouts: null,
              user,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            })
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//Parameters for the token : data you want to encode (payload) + secret key for encoding + config argument

/*
CRUD: Get all users
*/
exports.seeUsers = (req, res, next) => {
  User.find()
    .then( (users) => { res.status(200).json(users)} )
    .catch( (error) => {res.status(400).json({ error:error })} );
};
//

/*
CRUD: detelete a user
*/
exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id})
    .then(() => res.status(201).json({ message : 'Utilisateur supprimé !' }))
    .catch(error => res.status(400).json({ error:error }));
};
//