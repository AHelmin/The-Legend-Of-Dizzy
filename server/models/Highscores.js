const mongoose = require("mongoose");

const highscoresSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
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
},
{
  timestamps: true
})

const Highscores = mongoose.model('Highscores', highscoresSchema);
module.exports = Highscores;