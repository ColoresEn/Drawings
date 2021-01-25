const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const BookSchema = new Schema({
  
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
       
    },
    bookId: Number
});
var Book =mongoose.model('Book', BookSchema);
module.exports = Book
