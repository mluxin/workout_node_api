/*
Imports
*/
const express = require('express');
const router = express.Router();

const workoutController = require('../controllers/workout.controller')
const auth = require('../middlewares/auth');
//

/*
Routes definition
*/
router.get('/all', auth, workoutController.getAllWorkouts);
router.post('/create', auth, workoutController.createWorkout);
router.get('/:id', auth, workoutController.getOneWorkout);
router.put('/:id', auth, workoutController.updateWorkout);
router.delete('/:id', auth, workoutController.deleteWorkout);
//

/*
Export
*/
module.exports = router;
//