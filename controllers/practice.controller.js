/*
Imports
*/
const practiceModel = require('../models/practice.schema');

/*
CRUD: Create a practice
*/
exports.createPractice = (req, res, next) => {
  delete req.body._id;

  const practice = new practiceModel ({
    sport: req.body.sport,
    userId: req.body.userId,
  });
  practice.save()
    .then(() => res.status(201).json({message : 'Pratique enregistrée !'}))
    .catch(error => res.status(400).json({error: error}));
};
//

/*
CRUD: Get all the practices
*/
exports.getAllPractices = (req, res, next) => {
  practiceModel.find()
    .then( (practices) => { res.status(200).json(practices)} )
    .catch( (error) => { res.status(400).json({ error:error })} );
};
//

/*
CRUD: Get one practice
*/
exports.getOnePractice = (req, res, next) => {
  practiceModel.findOne( { _id: req.params.id} )
    .then(practice => res.status(200).json(practice))
    .catch(error => res.status(404).json({ error }));
};
//

/*
CRUD: Update a practice
*/
exports.updatePractice = (req, res, next) => {
  const practice = new practiceModel({
    _id: req.params.id,
    sport: req.body.sport,
    userId: req.body.userId,
  });

  practiceModel.updateOne({_id: req.params.id}, practice)
    .then(() => res.status(201).json({ message : 'Pratique modifiée !' }))
    .catch(error => res.status(400).json({ error:error }));
};
//

/*
CRUD: Delete a practice
*/
exports.deletePractice = (req, res, next) => {
  practiceModel.deleteOne({ _id: req.params.id})
    .then(() => res.status(201).json({ message : 'Pratique supprimés !' }))
    .catch(error => res.status(400).json({ error:error }));
};
//

