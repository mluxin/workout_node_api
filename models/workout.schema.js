/*Import
*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Schema
*/
const workoutSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true },
});

/*
Export
*/
const MyModel = mongoose.model('Workout', workoutSchema);
module.exports = MyModel;
//
