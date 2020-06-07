/*Import
*/
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

/* Schema
*/
const userSchema = new Schema({
  name: {type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// put the validator directly to the schema before make it a model
userSchema.plugin(uniqueValidator);

/*
Export
*/
const MyModel = mongoose.model('user', userSchema);
module.exports = MyModel;
//
