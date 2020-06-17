/*
Imports
*/
const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goal.controller');
const auth = require('../middlewares/auth');
//

/*
Routes definition
*/
router.get('/all', auth, goalController.getAllGoals);
router.post('/create', auth, goalController.createGoal);
router.get('/:id', auth, goalController.getOneGoal);
router.put('/:id', auth, goalController.updateGoal);
router.delete('/:id', auth,  goalController.deleteGoal);
//

/*
Export
*/
module.exports = router;
//