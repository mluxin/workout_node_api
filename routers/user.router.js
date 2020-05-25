/*
Imports
*/
const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');

/*
Routes
*/
router.post('/signup', userController.signup);
router.post('/login', userController.login);
/* router.get('/logout', userController.logout); */
router.get('/all', userController.seeUsers);

/*
Exports
*/
module.exports = router;