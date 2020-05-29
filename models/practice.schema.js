/*Import
*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Schema
*/
const practiceSchema = new Schema({
  sport: { type: String, required: true },
  userId: { type: String, required: true },
});


/*
Export
*/
const MyModel = mongoose.model('practice', practiceSchema);
module.exports = MyModel;
//