/*
Imports
*/
const express = require('express');
const router = express.Router();

const practiceController = require('../controllers/practice.controller')
//

/*
Routes definition
*/
router.get('/all', practiceController.getAllPractices);
router.post('/create', practiceController.createPractice);
router.get('/:id', practiceController.getOnePractice);
router.put('/:id', practiceController.updatePractice);
router.delete('/:id', practiceController.deletePractice);
//

/*
Export
*/
module.exports = router;
//