/*Import
*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Schema
*/
const goalSchema = new Schema({
  label: { type: String, required: true },
  status: { type: String, required: true },
  practiceId: { type: String, required: true },
  userId: { type: String, required: true },
});


/*
Export
*/
const MyModel = mongoose.model('goal', goalSchema);
module.exports = MyModel;
//