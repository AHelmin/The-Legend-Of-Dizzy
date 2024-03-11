const mongoose = require("mongoose");

const highscoresSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
    trim: true
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
},
{
  timestamps: true
})

const Highscores = mongoose.model('Highscores', highscoresSchema);
module.exports = Highscores;