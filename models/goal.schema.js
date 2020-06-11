/*Import
*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Schema
*/
const goalSchema = new Schema({
  label: { type: String, required: true },
  status: {
    type: String,
    enum: ["pas commencé", "en cours", "terminé"],
    required: true
  },
  practiceId: { type: String },
  userId: { type: String, required: true },
});


/*
Export
*/
const MyModel = mongoose.model('goal', goalSchema);
module.exports = MyModel;
//