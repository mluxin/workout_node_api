/*Import
*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Schema
*/
const workoutSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  comment: { type: String, required: false },
  intensity: { type: String, required: true },
  mood: { type: String, required: true },
  practiceId: { type: String, required: true },
  userId: { type: String, required: true },
});


/*
Export
*/
const MyModel = mongoose.model('workout', workoutSchema);
module.exports = MyModel;
//
