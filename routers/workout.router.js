/*
Imports
*/
const express = require('express');
const router = express.Router();

const workoutController = require('../controllers/workout.controller')
//

/*
Routes definition
*/
router.get('/all', workoutController.getAllWorkouts);
router.post('/create', workoutController.createWorkout);
router.get('/:id', workoutController.getOneWorkout);
router.put('/:id', workoutController.updateWorkout);
router.delete('/:id', workoutController.deleteWorkout);
//

/*
Export
*/
module.exports = router;
//