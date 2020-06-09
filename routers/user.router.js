/*
Imports
*/
const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');
// add middleware on routes we want to protect
/* const auth = require('../middleware/auth'); */

/*
Routes
*/
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/me', userController.connectedUser);
router.get('/all', userController.seeUsers);
router.delete('/:id', userController.deleteUser);

/*
Exports
*/
module.exports = router;