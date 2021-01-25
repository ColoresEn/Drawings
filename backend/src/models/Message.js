const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: String,
  username: String,
  date: {
    type: Date,
    default: Date.now()
},
});

const Message= mongoose.model('Message', MessageSchema);

module.exports = Message;