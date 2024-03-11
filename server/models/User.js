const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    validate: {
      validator: function (email) {
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email)
      }, message: props => `${props.value} is not a valid email.`
    }
  },
  password: {
    type: String,
  },
  scores: [Number]
},{
  timestamps: true
})

const User = mongoose.model('User', userSchema);
module.exports = User;