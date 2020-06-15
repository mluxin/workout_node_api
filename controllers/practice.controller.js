/*
Imports
*/
const practiceModel = require('../models/practice.schema');

const Goal = require('../models/goal.schema');
const Workout = require('../models/workout.schema');

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
    .then( async practices => {
      let dataArray = [];
      for (let item of practices) {
        const practice = await fetchOnePractice(item._id);
        dataArray.push(practice);
      }
      return res.status(200).json({ data:dataArray })
    })
    .catch( (error) => { res.status(400).json({ error:error })} );
};
//

/*
CRUD: Get one practice
*/
exports.getOnePractice = (id, res, next) => {
  console.log(id);
  practiceModel.findOne( { _id: id} )

    .then(practice => {
      Promise.all([
        Goal.find({ practiceId: practice._id }),
        Workout.find({ practiceId: practice._id })
      ])
      .then((apiResponse) => {
        return res.status(201).json({
          message: 'Objectifs et entrainements en lien avec la pratique',
          goals:apiResponse[0],
          workouts:apiResponse[1]
        })
      })
      .catch((apiResponse) => {
        return res.status(400).json({
          message: 'Elements non trouvés',
          goals:null,
          workouts: null
        })
      });
    })
    .catch(error => res.status(404).json({ error }));
};

  const fetchOnePractice = id => {
    return new Promise ((resolve, reject) => {
      Promise.all([
        practiceModel.findById(id),
        Goal.find({ practiceId: id }),
        Workout.find({ practiceId: id })
      ])
      .then((apiResponse) => {
        return resolve (apiResponse);
      })
      .catch((apiResponse) => {
        return reject(apiResponse);
      });
    })
  }
//

/*
CRUD: Update a practice
*/
exports.updatePractice = (req, res, next) => {
  const practice = new practiceModel({
    _id: req.params.id,
    sport: req.body.sport,
    goalId: req.body.goalId,
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


