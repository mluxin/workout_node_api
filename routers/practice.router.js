/*
Imports
*/
const express = require('express');
const router = express.Router();

const practiceController = require('../controllers/practice.controller')
const auth = require('../middlewares/auth');
//

/*
Routes definition
*/
router.get('/all', practiceController.getAllPractices);
router.post('/create', practiceController.createPractice);
router.get('/:id', (req, res) => practiceController.getOnePractice(req.params.id, res, next));
router.put('/:id', practiceController.updatePractice);
router.delete('/:id', practiceController.deletePractice);
//

/*
Export
*/
module.exports = router;
//