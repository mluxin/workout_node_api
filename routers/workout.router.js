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
router.post('/', workoutController.createWorkout);
router.get('/:id', workoutController.getOneWorkout);
router.put('/:id', workoutController.updateWorkout);
router.delete('/:id', workoutController.deleteWorkout);
router.get('/', workoutController.getAllWorkouts);
//

/*
Export
*/
module.exports = router;
//