const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: false, unique:true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  //time stamp user when created
  createAt:{
  type:Date,
  default:Date.now}, 
   //time stamp user when edited and  Updated
  updatedAt:{
    type:Date,
    default:Date.now
}
});


const User =mongoose.model('User', userSchema,'users');
module.exports = User;