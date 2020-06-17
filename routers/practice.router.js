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
router.get('/all', auth, practiceController.getAllPractices);
router.post('/create', auth, practiceController.createPractice);
router.get('/:id', auth, (req, res) => practiceController.getOnePractice(req.params.id, res, next));
router.put('/:id', auth, practiceController.updatePractice);
router.delete('/:id', auth, practiceController.deletePractice);
//

/*
Export
*/
module.exports = router;
//