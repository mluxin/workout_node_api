/*
Imports
*/
const express = require('express');
const router = express.Router();

const goalController = require('../controllers/goal.controller')
//

/*
Routes definition
*/
router.get('/all', goalController.getAllGoals);
router.post('/create', goalController.createGoal);
router.get('/:id', goalController.getOneGoal);
router.put('/:id', goalController.updateGoal);
router.delete('/:id', goalController.deleteGoal);
//

/*
Export
*/
module.exports = router;
//