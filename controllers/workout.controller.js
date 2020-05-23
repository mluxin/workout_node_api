/*
Imports
*/
const workoutModel = require('../models/workout.schema');

/*
CRUD: Create a workout
*/
  exports.createWorkout = (req, res, next) => {
    delete req.body._id;

    const workout = new workoutModel ({
      title: req.body.title,
      description: req.body.description,
      userId: req.body.userId
    });
    workout.save()
      .then(() => res.status(201).json({message : 'Entrainement enregistré !'}))
      .catch(error => res.status(400).json({error: error}));
  };
//

/*
CRUD: Get all the workout
*/
  exports.getAllWorkouts = (req, res, next) => {
    workoutModel.find()
      .then( (workouts) => { res.status(200).json(workouts)} )
      .catch( (error) => { res.status(400).json({ error:error })} );
  };
//

/*
CRUD: Get one workout
*/
  exports.getOneWorkout = (req, res, next) => {
    workoutModel.findOne( { _id: req.params.id} )
      .then(workout => res.status(200).json(workout))
      .catch(error => res.status(404).json({ error }));
  };
//

/*
CRUD: Update a workout
*/
  exports.updateWorkout = (req, res, next) => {
    const workout = new workoutModel({
      _id: req.params.id,
      title: req.body.title,
      userId: req.body.userId
    });

    workoutModel.updateOne({_id: req.params.id}, workout)
      .then(() => res.status(201).json({ message : 'Workout modifié !' }))
      .catch(error => res.status(400).json({ error:error }));
  };
//

/*
CRUD: detelete a workout
*/
  exports.deleteWorkout = (req, res, next) => {
    workoutModel.deleteOne({ _id: req.params.id})
      .then(() => res.status(201).json({ message : 'workout supprimé !' }))
      .catch(error => res.status(400).json({ error:error }));
  };
//


