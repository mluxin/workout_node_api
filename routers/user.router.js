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
router.get('/all', userController.seeUsers);
router.delete('/:id', userController.deleteUser);

/*
Exports
*/
module.exports = router;