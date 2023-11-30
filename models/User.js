const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique:true, },
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












// // Hash password before saving it.
// userSchema.pre('save', function (next) {
//   const user = this;
//   if (!user.isModified('password')) return next();

//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return next(err);

//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
// });

// // Compare user entered password with hashed password.
// userSchema.methods.comparePassword = function (candidatePassword, callback) {
//   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//     if (err) return callback(err);
//     callback(null, isMatch);
//   });
// };

const User =mongoose.model('User', userSchema,'users');
module.exports = User;