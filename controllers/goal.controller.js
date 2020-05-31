/*
Imports
*/
const goalModel = require('../models/goal.schema');
const Practice = require('../models/practice.schema');

/*
CRUD: Create a goal
*/
exports.createGoal = (req, res, next) => {
  delete req.body._id;

  const goal = new goalModel ({
    label: req.body.label,
    status: req.body.status,
    practiceId: req.body.practiceId,
    userId: req.body.userId,
  });
  goal.save()
    .then(() => res.status(201).json({message : 'Objectif enregistré!'}))
    .catch(error => res.status(400).json({error: error}));
};
//

/*
CRUD: Get all the goals
*/
exports.getAllGoals = (req, res, next) => {
  goalModel.find()
    .then( (goals) => { res.status(200).json(goals)} )
    .catch( (error) => { res.status(400).json({ error:error })} );
};
//

/*
CRUD: Get one goal
*/
exports.getOneGoal = (req, res, next) => {
  goalModel.findOne( { _id: req.params.id} )

    .then(goal => {
      Promise.all([
        Practice.find({ goalId: goal._id })
      ])
      .then((apiResponse) => {
        return res.status(201).json({
          message: "Pratique en lien avec l'objectif",
          practices:apiResponse[0]
        })
      })
      .catch((apiResponse) => {
        return res.status(400).json({
          message: 'Elements non trouvés',
          practice:null
        })
      });
    })
    .catch(error => res.status(404).json({ error }));
};
//

/*
CRUD: Update a goal
*/
exports.updateGoal = (req, res, next) => {
  const goal = new goalModel({
    _id: req.params.id,
    label: req.body.label,
    status: req.body.status,
    practiceId: req.body.practiceId,
    userId: req.body.userId,
  });

  goalModel.updateOne({_id: req.params.id}, goal)
    .then(() => res.status(201).json({ message : 'Objectif modifié !' }))
    .catch(error => res.status(400).json({ error:error }));
};
//

/*
CRUD: Delete a goal
*/
exports.deleteGoal = (req, res, next) => {
  goalModel.deleteOne({ _id: req.params.id})
    .then(() => res.status(201).json({ message : 'Objectif supprimé !' }))
    .catch(error => res.status(400).json({ error:error }));
};
//
