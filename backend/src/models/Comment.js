const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CommentSchema = new Schema({
  postername: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
 
  timestamp: { type: Date, default: Date.now }
});


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
