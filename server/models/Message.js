const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: function (email) {
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email)
      }, message: props => `${props.value} is not a valid email.`
    }
  },
  message: {
    type: String
  }
},
{
  timestamps: true
})

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;