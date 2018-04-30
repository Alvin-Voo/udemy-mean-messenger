let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongooseUnqiueValidator = require('mongoose-unique-validator');

let schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]// one user has MANY messages, hence an array here
});

schema.plugin(mongooseUnqiueValidator);

module.exports = mongoose.model('User', schema);
