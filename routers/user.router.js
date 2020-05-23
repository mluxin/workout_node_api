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
router.get('/see', userController.seeUsers);

/*
Exports
*/
module.exports = router;